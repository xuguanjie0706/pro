import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer/index';
import './index.less';

import api from '@/api';

const { Option } = Select;

const CustomForm = (props) => {
  const { defaultData, setFieldsValue, resetFields, step, pkgList } = props;
  const { privilegeList } = defaultData;
  const [pkg, setPkg] = useState([]);
  const [amount, setAmout] = useState(0);

  const selectChange = (value) => {
    console.log(value);
    const it = pkg.find(item => item.pkgId === value);
    setAmout(it.amount);
  };

  useEffect(() => {
    if (defaultData.id) {
      api.cdkey.pkgList({ chnerUserId: defaultData.id }).then(r => {
        setPkg(r);
        defaultData.pkgId = r[0].pkgId;
        defaultData.chnerUserId = defaultData.id;
        setFieldsValue(defaultData);
      });
    } else {
      resetFields();
    }
  }, [defaultData.id]);


  useEffect(() => {
    if (pkg.length)
      selectChange(pkg[0].pkgId);
  }, [pkg.length]);
  return (
    <>
      {step !== 1 && (
        <div style={{ width: '100%' }}>
          {privilegeList &&
            privilegeList.map((item, key) => (
              <div className="rightbox" key={key}>
                <div className="right1">
                  <span className="righttitle">{item.cardName}</span>
                  <span className="rightdate">
                    {!!item.privilegeRemainDays && (
                      <span>剩余有效期：{item.privilegeRemainDays}天</span>
                    )}
                    {!!item.privilegeRemainTimes && (
                      <span style={{ marginLeft: 14 }}>
                        剩余次数：{item.privilegeRemainTimes}次
                      </span>
                    )}
                  </span>
                </div>
                <div className="right2">{item.cardDesc}</div>
              </div>
            ))}
          {!privilegeList && '用户当前暂无权益'}
        </div>
      )}
      {step === 1 && (
        <div style={{ display: 'block', width: '100%' }}>
          <Form.Item label="选择套餐" name="pkgId" >
            <Select allowClear style={{ width: 180 }} onChange={selectChange}>
              {
                pkgList.map(item => <Option value={item.pkgId} title={item.pkgName}
                  key={item.pkgId}>{item.pkgName}</Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea
              style={{ width: 180 }}
              maxLength={20}
            // onChange={e => this.setState({ remark: e.target.value })}
            />
          </Form.Item>
          <Form.Item noStyle name="issueType" initialValue="4">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item noStyle name="chnerUserId">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item label colon={false}>
            <span style={{ color: '#F64444' }}>*</span>
            <span>向用户发送一次所选中套餐，剩余{amount}</span>
          </Form.Item>

        </div>
      )}
    </>
  );
};

export default CustomModalContainer(CustomForm);
