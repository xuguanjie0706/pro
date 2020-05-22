import React, { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer/index';
import { phoneValidator } from '@/utils/validator';
// import { connect } from 'umi';

const { Option } = Select;

const CustomForm = (props) => {
  // const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
  const { defaultData, setFieldsValue, pkgList = [], resetFields } = props;
  // const [data, setdata] = useState(defaultData);
  // console.log(defaultData);
  // console.log(props);
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
        label="权益包"
        name="pkgId"
        rules={[{ required: true, message: '请选择权益包' }]}
      >
        <Select allowClear>
          {
            pkgList.map(item => <Option key={item.pkgId} value={item.pkgId}>{item.pkgName}</Option>)
          }
        </Select>
      </Form.Item>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween' }}>
        <Form.Item
          label="姓名"
          name="issuerName"
          labelCol={{ span: 8 }}
          style={{ width: '50%' }}
          rules={[{ required: true, message: '请输入姓名' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号"
          required
          labelCol={{ span: 8 }}
          name="issuerMobile"
          style={{ width: '50%' }}
          rules={[
            {
              validator: phoneValidator
            }]}>
          <Input maxLength={11} />
        </Form.Item>
      </div>
      {/* <Form.Item
        label="权益包"
        name="groupId"
        rules={[{ required: true, message: '请选择权益包' }]}
      >
        <Select>
          {
            pkgList.map(item => <Option key={item.pkgId} value={item.pkgId}>{item.pkgName}</Option>)
          }
        </Select>
      </Form.Item> */}

      <Form.Item label="数量" required>
        <Form.Item name="amount" noStyle rules={[{ required: true, message: '请输入正确的数字' }]}>
          <InputNumber min={1} max={10} />
        </Form.Item>
        <span className="ant-form-text"> 剩余</span>
      </Form.Item>


    </>
  );
};

// export default connect(({ base }) => ({ pkgList: base.pkgList }))(CustomModalContainer(CustomForm));
export default CustomModalContainer(CustomForm);
