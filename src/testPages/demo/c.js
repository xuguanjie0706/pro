import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import imgs from '../../assets/img/avatar/default.png'
  ;

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
    // try {
    //   const values = await form.validateFields();
    //   console.log('Success:', values);
    // } catch (errorInfo) {
    //   console.log('Failed:', errorInfo);
    // }
  };
  // const handleClick = () => {
  //   form.setFieldsValue({ nickname: '123' });
  //   console.log(form.isFieldsTouched());

  //   //  const a =   form.isFieldsTouched();
  // };

  const downloadImg = () => {
    const img = document.getElementById('testImg'); // 获取要下载的图片
    const url = img.src; // 获取图片地址
    const a = document.createElement('a'); // 创建一个a节点插入的document
    const event = new MouseEvent('click'); // 模拟鼠标click点击事件
    a.download = '图片名字'; // 设置a节点的download属性值
    a.href = url; // 将图片的src赋值给a节点的href
    a.dispatchEvent(event);
  };
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

      <img id="testImg" src={imgs} alt="" />
      <Button type="primary" onClick={downloadImg}>
        Check
          </Button>
      {/* <Button οnClick={downloadImg}>下载图片1</Button> */}
    </>
  );
};

export default Custom;
