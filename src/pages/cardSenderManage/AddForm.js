import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer/index';


const CustomForm = (props) => {
  const { defaultData, setFieldsValue, resetFields } = props;

  useEffect(() => {
    if (defaultData.id) {
      setFieldsValue(defaultData);
    } else {
      resetFields();
    }
  }, [defaultData.id]);

  return (
    <>
      <Form.Item
        label="分组名称"
        name="name"
        labelCol={{ span: 4 }}
        rules={[{ required: true, message: '请分组名称' }]}>
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        noStyle
        name="type"
        initialValue="1">
        <Input type="hidden" />
      </Form.Item>
    </>
  );
};

export default CustomModalContainer(CustomForm);
