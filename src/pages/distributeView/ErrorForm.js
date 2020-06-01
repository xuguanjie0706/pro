import React from 'react';
// import { Form, Input, Select, DatePicker } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer';
import CellList from './components/CellList';


const CustomForm = ({ defaultData, form, ledgerStatusType }) => {
  // const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
  console.log(defaultData);


  return (
    <>
      <p>以下用户权益分发失败，请及时处理：</p>
      <CellList defaultData={defaultData} />
    </>
  );
};

export default CustomModalContainer(CustomForm);
