import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer';

const { Option } = Select;

const CustomForm = ({ defaultData, form, ledgerStatusType }) => {
  // const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  return (
    <>
      <Form.Item label="分账状态">
        <Select>
          <Option />

        </Select>
      </Form.Item>
    </>
  );
};

export default CustomModalContainer(CustomForm);
