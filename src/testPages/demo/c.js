import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

const Custom = () => {
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);
  // useEffect(() => {
  //   form.validateFields(['nickname']);
  // }, [checkNick]);
  // console.log(form);

  const onCheckboxChange = (e) => {
    setCheckNick(e.target.checked);
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  // const handleClick = () => {
  //   form.setFieldsValue({ nickname: '123' });
  //   console.log(form.isFieldsTouched());

  //   //  const a =   form.isFieldsTouched();
  // };
  return (
    <>
      {' '}
      <Form form={form} name="dynamic_rule">
        <Form.Item
          {...formItemLayout}
          name="username"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input placeholder="Please input your name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="nickname"
          label="Nickname"
          rules={[
            {
              required: checkNick,
              message: 'Please input your nickname',
            },
          ]}
        >
          <Input placeholder="Please input your nickname" />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Checkbox checked={checkNick} onChange={onCheckboxChange}>
            Nickname is required
          </Checkbox>
        </Form.Item>
        {/* <button onClick={handleClick}>1231</button> */}
        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={onCheck}>
            Check
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Custom;
