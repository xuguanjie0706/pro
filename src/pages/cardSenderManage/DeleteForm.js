import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer/index';
// import { connect } from 'umi';


const CustomForm = (props) => {
  const { defaultData, setFieldsValue, resetFields } = props;
  useEffect(() => {
    if (defaultData.id) {
      setFieldsValue({ issuerIdList: [defaultData.issuerId] });
    } else {
      resetFields();
    }
  }, [defaultData.id]);


  return (
    <>
      <Form.Item
        noStyle
        name='issuerIdList'
      >
        <Input type="hidden" />
      </Form.Item>
      清退后代理人将不再拥有发卡权限，是否确认清退？
    </>
  );
};

export default CustomModalContainer(CustomForm);
