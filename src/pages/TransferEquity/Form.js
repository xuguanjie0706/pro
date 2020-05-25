import React from 'react';
import { Form, Input, Select, Col, InputNumber } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer';

const { Option } = Select;
const { TextArea } = Input;
const CustomForm = (props) => {
  const { pkgList, defaultData } = props;
  const selectChange = () => {

  };
  return (
    <>
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
      <Col offset={4}>
        <div style={{
          background: 'rgba(244, 244, 244, 1)',
          borderRadius: 4,
          padding: '8px 16px',
          margin: '-15px 0 15px'

        }}>
          <div>
            免费在线问诊30天无限次 有效期：30天
          </div>
          <div>
            名医预约1次 名医预约1次 次数：1次
          </div>
        </div>
      </Col>

      <div style={{ display: 'flex', height: 54, flexDirection: 'row', justifyContent: 'spaceBetween' }}>
        <Form.Item
          label="代理商"
          name="issuerName"
          labelCol={{ span: 8 }}
          style={{ width: '50%' }}
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Select>
            <Option />
          </Select>
        </Form.Item>
        <Form.Item
          label="数量"
          required
          labelCol={{ span: 8 }}
          style={{ width: '50%' }}
        >
          <Form.Item noStyle name="issuerMobile">
            <InputNumber style={{ width: '100%' }} min={0} max={10} step={0.1} />
            {/* <InputNumber maxLength={11} /> */}
          </Form.Item>&nbsp;
          <span style={{
            position: 'absolute',
            right: 24,
            top: 5,
            color: 'rgba(153,153,153,1)'
          }}>剩余10</span>
        </Form.Item>
      </div>
      <Form.Item label="备注" name="remark">
        <TextArea maxLength={20} autoSize={{ minRows: 3, maxRows: 5 }} type="textarea" allowClear />
      </Form.Item>
    </>
  );
};

export default CustomModalContainer(CustomForm);
