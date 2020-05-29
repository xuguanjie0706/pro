import React from 'react';
import { Input, Form, Row, Col, Select } from 'antd';
// import DateFilter from '@/components/CustomFormItem/DateFilter';
// import SearchSelect from '@/components/CustomApiFormItem/SearchSelect';
// import moment from 'moment';

const { Option } = Select;
const Search = (props) => {
  const { STATUS_LIST = [], pkgList = [], form, defaultSearchData } = props;
  const statusList = Object.entries(STATUS_LIST);

  form.setFieldsValue(defaultSearchData);
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="toName"
          label="代理商名称"
        >
          <Input allowClear />
        </Form.Item>
      </Col >
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="toContact"
          label="联系电话"
        >
          <Input allowClear />
        </Form.Item>
      </Col >
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
        <Form.Item
          name="pkgId"
          label="权益套餐"
        >
          <Select
            // placeholder="请选择套餐"
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
    </Row >
  );
};

export default Search;
