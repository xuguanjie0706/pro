import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import '../index.less';
import { phoneValidator } from '@/utils/validator';
import CodeButton from './CodeButton';


const layout = {
  labelCol: { sm: 4, md: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const BaseForm = (props) => {
  const { setStep, setAgentType } = props;
  const [form] = Form.useForm();
  const defaultData = {
    daili: '1',
    mobile: '18079442433'
  };

  const handleClick = (values) => {
    console.log(values);
    // form.validateFields().then(r => {
    //   console.log(r);

    // });
    setStep(1);
  };

  const changePhone = (values) => {
    console.log(values);
  };

  const changeRadio = (e) => {
    setAgentType(e.target.value);
  };
  return (
    <Form {...layout} form={form} onFinish={handleClick} initialValues={defaultData}>
      <div style={{ paddingTop: 32 }}>
        <Form.Item
          label="代理商类型"
          name="daili"
          rules={[{ required: true }]}
        >
          <Radio.Group onChange={changeRadio}>
            <Radio value="1">个人</Radio>
            <Radio value="2">企业</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          required
          name="mobile"
          rules={[{ validator: phoneValidator }]}
          label="联系电话">
          <Input className="width400" onChange={changePhone} />
        </Form.Item>
        <Form.Item label="验证码" required >
          <Form.Item noStyle name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <Input className="width400" />
          </Form.Item>
          <CodeButton form={form} delay={5} style={{ position: 'absolute', left: 300 }} />
          {/* <Button type="link" >
            发送验证码
          </Button> */}
        </Form.Item>
        <Form.Item
          style={{ paddingBottom: 32 }}
          {...tailLayout}>
          <Button htmlType="submit" type="primary">下一步</Button>
        </Form.Item>
      </div>
    </Form>
  );
};


export default BaseForm;
