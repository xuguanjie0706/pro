
import React, { useState } from 'react';
import { Button, message } from 'antd';

const CodeButton = (props) => {
  const { request, delay = 60, form } = props;
  let T = delay;
  const [time, setTime] = useState(delay);
  const [disabled, setDisabled] = useState(false);
  let timer = null;
  const setCode = async () => {
    const value = form.getFieldValue('mobile');

    console.log(value);


    const r = request && await request();
    if (r) {
      setDisabled(true);
      timer = setInterval(() => {
        T -= 1;
        setTime(T);
        if (T === 0) {
          clearInterval(timer);
          setDisabled(false);
          T = delay;
          setTime(delay);
        }
      }, 1000);
    } else {
      message.error('发送失败');
    }
  };
  return (
    <>
      <Button onClick={setCode} disabled={disabled} type="link" style={{ position: 'absolute', left: 300 }}>
        {disabled ? `已发送${time}s` : '发送验证码'}
      </Button>
    </>
  );
};

export default CodeButton;