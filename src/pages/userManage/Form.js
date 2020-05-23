import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import CustomModalContainer from '@/components/CustomModalContainer';
import TagSelect from '@/components/CustomApiFormItem/TagSelect';
import AddForm from './AddForm';

const { TextArea } = Input;
const { Option } = Select;

const CustomForm = (props) => {
  const {
    defaultData = {},
    setFieldsValue,
    resetFields,
    otherGroupList = [],
    tagList = [],
    dispatch,
  } = props;
  const [addChild, setAddChild] = useState(null);
  const modelRef = (ref) => {
    setAddChild(ref);
  };
  // console.log(defaultData);

  useEffect(() => {
    if (defaultData.id) {
      setFieldsValue(defaultData);
    } else {
      resetFields();
    }
  }, [defaultData.id]);

  const handleEdit = async () => {
    if (addChild) {
      addChild.handleShow();
    }
  };

  const request = (name) => {
    return dispatch({
      type: 'base/addTag',
      payload: {
        name,
        type: 2,
      },
    });
  };

  return (
    <>
      <Form.Item label="分组">
        <Form.Item noStyle name="groupId">
          <Select allowClear style={{ width: 200 }}>
            {otherGroupList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Button onClick={handleEdit} style={{ marginLeft: 10 }}>
          添加分组
        </Button>
      </Form.Item>

      <Form.Item label="标签" name="tagIdList">
        <TagSelect tagList={tagList} request={(name) => request(name)} />
      </Form.Item>
      <Form.Item label="备注" name="remark">
        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} type="textarea" allowClear />
      </Form.Item>
      <Form.Item name="id">
        <Input type="hidden" />
      </Form.Item>
      <AddForm onRef={modelRef} title="添加分组" request={request} />
    </>
  );
};

export default CustomModalContainer(CustomForm);
