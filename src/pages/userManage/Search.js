import React from 'react';
import { Input, Form, Row, Col, Select } from 'antd';
import DateFilter from '@/components/CustomFormItem/DateFilter';
import SearchSelect from '@/components/CustomApiFormItem/SearchSelect';
import moment from 'moment';

const { Option } = Select;
const Search = (props) => {
  const { form, otherGroupList = [], tagList = [] } = props;

  const changeTime = (time) => {
    form.setFieldsValue({ 'createDtBeg': time ? moment(time[0]).format('YYYY-MM-DD') : null });
    form.setFieldsValue({ 'createDtEnd': time ? moment(time[1]).format('YYYY-MM-DD') : null });
  };
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
        <Form.Item
          name="time"
          label="发卡时间"
        >
          <DateFilter callback={changeTime} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="userId"
          label="用户"
        >
          <SearchSelect allowClear />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="groupId"
          label="所属分组"
        >
          <Select
            placeholder="请选择分组"
            style={{ width: '100%' }}
            allowClear
          >
            {otherGroupList.map(
              (item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              )
            )}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="tagId"
          label="标签"
        >
          <Select
            placeholder="请选择标签"
            style={{ width: '100%' }}
            allowClear
          >
            {tagList.map(
              (item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              )
            )}
          </Select>
        </Form.Item>
      </Col >
      <Form.Item
        name="createDtBeg"
      >
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        name="createDtEnd"
      >
        <Input type="hidden" />
      </Form.Item>
    </Row >
  );
};

export default Search;
