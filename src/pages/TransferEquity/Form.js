import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Col, InputNumber } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer';
import { connect } from 'umi';
import api from '@/api';

const { Option } = Select;
const { TextArea } = Input;
const CustomForm = (props) => {
  const { defaultData, dispatch, pkgDetailList = [] } = props;
  const [selectItem, setSelectItem] = useState({});
  const [agentList, setAgentList] = useState([]);

  const selectChange = (value) => {
    setSelectItem(pkgDetailList.find(item => item.pkgId === value));
  };

  const initLoad = () => {
    dispatch({
      type: 'base/getPkgDetailList'
    });
    api.agent.selectionList().then(r => {
      setAgentList(r);
    });
  };

  useEffect(() => {
    initLoad();
  }, []);

  return (
    <>
      <Form.Item
        label="代理商"
        name="toUid"
        labelCol={{ span: 8 }}
        style={{ width: '50%' }}
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <Select>
          {agentList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="权益包"
        name="pkgId"
        rules={[{ required: true, message: '请选择权益包' }]}
      >
        <Select onChange={selectChange}>
          {pkgDetailList.map((item) => (
            <Option key={item.pkgId} value={item.pkgId}>
              {item.pkgName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {selectItem.pkgDetail && <Col offset={4}>
        <div style={{
          background: 'rgba(244, 244, 244, 1)',
          borderRadius: 4,
          padding: '8px 16px',
          margin: '-15px 0 15px'

        }}>
          {selectItem.pkgDetail.map(item =>
            <> <div key={item.id}>
              {item.cardDesc} {item.timesDesc}
              {/* 免费在线问诊30天无限次 有效期：30天 */}
            </div>
            </>
          )}
        </div>
      </Col>
      }
      <div style={{ display: 'flex', height: 56, flexDirection: 'row', justifyContent: 'spaceBetween' }}>
        {/* <Form.Item
          label="代理商"
          name="issuerName"
          labelCol={{ span: 8 }}
          style={{ width: '50%' }}
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Select>
            <Option />
          </Select>
        </Form.Item> */}
        <Form.Item
          label="数量"
          required
          labelCol={{ span: 8 }}
          style={{ width: '50%' }}
        >
          <Form.Item name="amount" rules={[{
            validator: (rules, values) => {
              if (values <= selectItem.amount) {
                return Promise.resolve();
              }
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject('不能超过剩余数量!');
            }
          }]}>
            <InputNumber style={{ width: '100%' }} min={1} step={1} />
          </Form.Item>&nbsp;
          <span style={{
            position: 'absolute',
            right: 24,
            top: 5,
            color: 'rgba(153,153,153,1)'
          }}>剩余 {selectItem.amount || 0}</span>
        </Form.Item>
      </div>
      <Form.Item label="备注" name="remark">
        <TextArea maxLength={20} autoSize={{ minRows: 3, maxRows: 5 }} type="textarea" allowClear />
      </Form.Item>
    </>
  );
};

export default connect(({ base }) => ({
  pkgDetailList: base.pkgDetailList
}))(CustomModalContainer(CustomForm));

// export default CustomModalContainer(CustomForm);
