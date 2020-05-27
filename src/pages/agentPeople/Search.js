import React from 'react';
import { Input, Form, Row, Col, Select } from 'antd';


const { Option } = Select;
const Search = (props) => {
  const { LEVEL_LIST = [], AGENT_STATUS_LIST = [], cdkeyPkgList = [], form, defaultSearchData } = props;
  const agentStatusList = Object.entries(AGENT_STATUS_LIST);
  const levelList = Object.entries(LEVEL_LIST);
  form.setFieldsValue(defaultSearchData);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="name"
          label="代理商名称"
        >
          <Input allowClear />
        </Form.Item>
      </Col >
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="contact"
          label="联系电话"
        >
          <Input allowClear />
        </Form.Item>
      </Col >
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="agentLevel"
          label="代理级别"
        >
          <Select
            placeholder="请选择状态"
            style={{ width: '100%' }}
            allowClear
          >
            {levelList.map(
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
          name="pkgId"
          label="权益套餐"
        >
          <Select
            placeholder="请选择状态"
            style={{ width: '100%' }}
            allowClear
          >
            {cdkeyPkgList.map(
              (item) => (
                <Option key={item.pkdId} value={item.pkgId}>
                  {item.pkgName}
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
            {agentStatusList.map(
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
