import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer/index';
import AddForm from './AddForm';

const { Option } = Select;

const CustomForm = (props) => {
  const { defaultData = { list: [] }, setFieldsValue, groupList = [], actionType, dispatch } = props;

  const [addChild, setAddChild] = useState(null);
  const modelRef = (ref) => {
    setAddChild(ref);
  };
  console.log(defaultData);

  useEffect(() => {
    const list = defaultData.list.map(item => actionType === 2 ? item.id : item.issuerId);
    setFieldsValue({ [`${actionType === 2 ? 'idList' : 'issuerIdList'}`]: list });
  }, [defaultData.list.length]);

  const handleEdit = async () => {
    if (addChild) {
      addChild.handleShow();
    }
  };
  const request = (payload) => {
    return dispatch({
      type: 'base/addGroup',
      payload
    });
  };

  return (
    <>
      {actionType === 2 ?
        <Form.Item
          label="分组"
        >
          <Form.Item noStyle name="groupId" rules={[{ required: true, message: '请选择分组' }]}>
            <Select allowClear style={{ width: 200 }}>
              {
                groupList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
              }
            </Select>
          </Form.Item>
          <Button onClick={handleEdit} style={{ marginLeft: 10 }}>添加分组</Button>
        </Form.Item>
        : '清退后代理人将不再拥有发卡权限，是否确认清退？'
      }
      <Form.Item
        noStyle
        name={actionType === 2 ? 'idList' : 'issuerIdList'}
      >
        <Input type="hidden" />
      </Form.Item>
      <AddForm
        onRef={modelRef}
        title="添加分组"
        request={request}
      />
    </>
  );
};

export default CustomModalContainer(CustomForm);
