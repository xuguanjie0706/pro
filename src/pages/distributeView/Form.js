import React, { useState } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer';
import UploadEXCEL from '@/components/CustomApiFormItem/UploadEXCEL'
  ;

const { Option } = Select;

const CustomForm = (props) => {
  // const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
  const { pkgList = [], BATCH_TYPE_LIST = [] } = props;
  const batchTypeList = Object.entries(BATCH_TYPE_LIST);
  const [amount, setAmount] = useState(0);

  const selectChange = (value) => {
    const item = pkgList.find(it => it.pkgId === value);
    setAmount(item.amount);
  };
  return (
    <>
      <Form.Item label="权益激活方式" name="type" rules={[{ required: true, message: '请选择权益激活方式' }]}>
        <Select style={{ width: 180 }}>
          {batchTypeList.map(item => <Option key={item[0]} value={item[0]}>
            {item[1]}
          </Option>)}
        </Select>
      </Form.Item>
      <Form.Item label="选择套餐" required >
        <Form.Item noStyle name="pkgId" rules={[{ required: true, message: '请选择套餐' }]}>
          <Select style={{ width: 332 }} onChange={selectChange}>
            {pkgList.map(item => <Option key={item.pkgId} value={item.pkgId}>{item.pkgName}</Option>)}
          </Select>
        </Form.Item>
        <span className="hl-margin-l10" style={{ color: 'rgba(153, 153, 153, 1)' }}> 剩余{amount}</span>
      </Form.Item>
      <Form.Item name="filePath" label="导入" rules={[{ required: true, message: '请上传文件' }]}>
        <UploadEXCEL targetUrl="baidu.com" />
      </Form.Item>
    </>
  );
};

export default CustomModalContainer(CustomForm);
