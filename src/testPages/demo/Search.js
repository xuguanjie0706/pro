import React, { useEffect } from 'react';
import { Input, Form, Row, Col, Select } from 'antd';
import DateFilter from '@/components/CustomFormItem/DateFilter';
import SearchSelect from '@/components/CustomApiFormItem/SearchSelect';
import moment from 'moment';

const { Option } = Select;
const Search = (props) => {
  const { STATUS_LIST = [], pkgList, form } = props;
  const statusList = Object.entries(STATUS_LIST);


  const changeTime = (a) => {
    form.setFieldsValue({ 'startTime': moment(a[0]).format('YYYY-MM-DD') });
    form.setFieldsValue({ 'endTime': moment(a[1]).format('YYYY-MM-DD') });
  };
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
        <Form.Item
          name="username"
          label="发卡时间"
        >
          <DateFilter callback={changeTime} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="status"
          label="状态"
        >
          <Select
            placeholder="请选择状态"
            style={{ width: '100%' }}
            allowClear
          >
            {statusList.map(
              (item) => (
                <Option key={item[0]} value={item[0]}>
                  {item[1]}
                </Option>
              )
            )}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="pkgId"
          label="套餐"
        >
          <Select
            placeholder="请选择套餐"
            style={{ width: '100%' }}
            allowClear
          >
            {pkgList.map(
              (item) => (
                <Option key={item.pkgId} value={item.pkgId}>
                  {item.pkgName}
                </Option>
              )
            )}
          </Select>
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
          name="issuerName"
          label="代理商"
        >
          <Input allowClear />
        </Form.Item>
      </Col >
      <Form.Item
        name="startTime"
      >
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        name="endTime"
      >
        <Input type="hidden" />
      </Form.Item>
    </Row >
  );
};

export default Search;
