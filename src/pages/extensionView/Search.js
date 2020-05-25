import React from 'react';
import { Input, Form, Row, Col, Select } from 'antd';
import DateFilter from '@/components/CustomFormItem/DateFilter';
import SearchSelect from '@/components/CustomApiFormItem/SearchSelect';
import moment from 'moment';

const { Option } = Select;
const Search = (props) => {
  const { STATUS_LIST = [], pkgList, form, defaultSearchData } = props;
  const statusList = Object.entries(STATUS_LIST);

  form.setFieldsValue(defaultSearchData);
  return (
    <Row gutter={16}>
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
          name="status"
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
      </Col>


    </Row >
  );
};

export default Search;
