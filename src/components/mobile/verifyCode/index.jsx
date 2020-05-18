import { InputItem, Toast } from 'antd-mobile';
import styles from './style.less';
import http from '@/utils/http';
import { useState, useRef, forwardRef, useEffect } from 'react';

export default forwardRef((props, ref) => {
  const [second, setSecond] = useState(0);

  const { getPhone, ...inputProps } = props;

  let timer = useRef();
  function waiting() {
    timer.current && clearInterval(timer.current);
    let count = 60;
    setSecond(count);
    timer.current = setInterval(() => {
      setSecond(--count);
      if (count < 0) {
        timer.current && clearInterval(timer.current);
      }
    }, 1000);
  }
  function clearWaiting() {
    setSecond(0);
    timer.current && clearInterval(timer.current);
  }

  useEffect(() => {
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, []);

  function getCode() {
    getPhone(({ phone, error }) => {
      if (error) {
        Toast.info(error, 2, null, false);
        return;
      }
      waiting();
      http({
        url: '/get_sms_code',
        method: 'post',
        params: {
          mobile: phone,
        },
      })
        .then(result => {
          Toast.success('已发送短信', 2, null, false);
        })
        .catch(err => {
          clearWaiting();
        });
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      <InputItem
        {...inputProps}
        ref={ref}
        className={styles.input}
        extra={
          second <= 0 ? (
            <a onClick={getCode} className={styles.primaryColor}>
              获取验证码
            </a>
          ) : (
            <span>{second}s</span>
          )
        }
      ></InputItem>
    </div>
  );
});
