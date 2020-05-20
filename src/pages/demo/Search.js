import React from 'react';
import { Input, Form, Row, Col } from 'antd';
import DateFilter from '@/components/CustomFormItem/DateFilter';

const Custom = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={24} lg={12} xl={6} xxl={4}>
        <Form.Item
          name="username"
          label="Name"
        >
          <DateFilter />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
        <Form.Item
          name="username1"
          label="Name"
        >
          <Input placeholder="Please input your name" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
        <Form.Item
          name="username2"
          label="Name"
        >
          <Input placeholder="Please input your name" />
        </Form.Item>
      </Col>

    </Row>
  );
};

export default Custom;
