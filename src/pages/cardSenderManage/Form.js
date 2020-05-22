import React, { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer/index';
import { phoneValidator } from '@/utils/validator';
import api from '@/api';

const { Option } = Select;

const CustomForm = (props) => {
  // const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
  const { defaultData, setFieldsValue, pkgList = [], resetFields, groupList = [] } = props;
  const [amount, setAmout] = useState(0);
  const [pkg, setPkg] = useState([]);
  useEffect(() => {
    api.cdkey.pkgList({ chnerUserId: defaultData.id }).then((r) => {
      setPkg(r);
    });
    if (defaultData.id) {
      setFieldsValue(defaultData);
    } else {
      resetFields();
    }
  }, [defaultData.id]);

  const selectChange = (value) => {
    const it = pkg.find((item) => item.pkgId === value);
    setAmout(it.amount);
  };

  return (
    <>
      {!defaultData.id && (
        <Form.Item
          label="权益包"
          name="pkgId"
          rules={[{ required: true, message: '请选择权益包' }]}
        >
          <Select onChange={selectChange}>
            {pkgList.map((item) => (
              <Option key={item.pkgId} value={item.pkgId}>
                {item.pkgName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween' }}>
        <Form.Item
          label="姓名"
          name="issuerName"
          labelCol={{ span: 8 }}
          style={{ width: '50%' }}
          rules={[{ required: true, message: '请输入姓名' }]}
        >
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
              validator: phoneValidator,
            },
          ]}
        >
          <Input disabled={!!defaultData.id} maxLength={11} />
        </Form.Item>
      </div>
      {!!defaultData.id && (
        <Form.Item
          label="分组"
          name="groupId"
          rules={[{ required: true, message: '请选择权益包' }]}
        >
          <Select>
            {groupList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {!defaultData.id && (
        <Form.Item label="数量" required>
          <Form.Item
            name="amount"
            noStyle
            rules={[
              { required: true, message: '请输入正确的数字' },
              { type: 'number', max: amount, message: `最多不能超过${amount}` },
            ]}
          >
            <InputNumber min={1} max={amount} />
          </Form.Item>
          <span className="ant-form-text"> 剩余{amount}</span>
        </Form.Item>
      )}
      <Form.Item noStyle name="id">
        <Input type="hidden" />
      </Form.Item>
    </>
  );
};

// export default connect(({ base }) => ({ pkgList: base.pkgList }))(CustomModalContainer(CustomForm));
export default CustomModalContainer(CustomForm);
