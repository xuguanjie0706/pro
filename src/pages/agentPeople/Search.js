import React from 'react';
import { Input, Form, Row, Col, Select } from 'antd';


const { Option } = Select;
const Search = (props) => {
  const { STATUS_LIST = [], form, defaultSearchData } = props;
  const statusList = Object.entries(STATUS_LIST);

  form.setFieldsValue(defaultSearchData);

  return (
    <Row gutter={16}>
      {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
        <Form.Item
          name="time"
          label="发卡时间"
        >
          <DateFilter callback={changeTime} />
        </Form.Item>
      </Col> */}
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="issuerName"
          label="代理商名称"
        >
          <Input allowClear />
        </Form.Item>
      </Col >
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="issuerName"
          label="联系电话"
        >
          <Input allowClear />
        </Form.Item>
      </Col >
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="issuerName"
          label="代理级别"
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
      </Col >
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="issuerName"
          label="权益套餐"
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
      </Col >
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
    </Row >
  );
};

export default Search;
