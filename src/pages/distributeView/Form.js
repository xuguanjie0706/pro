import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer';

const { Option } = Select;

const CustomForm = ({ defaultData, form, ledgerStatusType }) => {
  // const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  return (
    <>
      <Form.Item label="权益激活方式">
        <Select>
          <Option />

        </Select>
      </Form.Item>
      <Form.Item label="选择套餐">
        <Select>
          <Option />

        </Select>
      </Form.Item>
      <Form.Item label="导入">
        <Form.Item noStyle>
          <Select>
            <Option />

          </Select>
        </Form.Item>
        <a href="">下载模板</a>
        <span><span>*</span>单次上传最多导入1万条记录</span>
      </Form.Item>
    </>
  );
};

export default CustomModalContainer(CustomForm);
