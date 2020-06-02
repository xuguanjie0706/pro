import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer/index';
import UploadEXCEL from '@/components/CustomApiFormItem/UploadEXCEL'
  ;

const { Option } = Select;

const CustomForm = (props) => {
  const { pkgList = [], BATCH_TYPE_LIST = [], initLoad } = props;

  const batchTypeList = Object.entries(BATCH_TYPE_LIST);
  const [amount, setAmount] = useState(0);


  const selectChange = (value) => {
    const item = pkgList.find(it => it.pkgId === value);
    setAmount(item.amount);
  };

  useEffect(() => {
    initLoad();
  }, []);


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
          <Select style={{ width: 300 }} onChange={selectChange}>
            {pkgList.map(item => <Option key={item.pkgId} value={item.pkgId}>{item.pkgName}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item noStyle> <Input type="hidden" name="amount" /></Form.Item>
        <span className="hl-margin-l10" style={{ color: 'rgba(153, 153, 153, 1)' }}>  剩余{amount}</span>
      </Form.Item>
      <Form.Item name="filePath" label="导入" rules={[{ required: true, message: '请上传文件' }]}>
        <UploadEXCEL targetUrl="https://image02.halove.com/uploadfiles/2020/5/29/d022be89-9d00-4b95-8361-3692daa1039e.xlsx#用户批量导入表-1.xlsx#fileimages/xls.gif" />
      </Form.Item>
    </>
  );
};

export default CustomModalContainer(CustomForm);
