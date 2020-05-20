import { Select, Avatar, Input } from 'antd';
import api from '@/api';
import React, { useState } from 'react';


const { Option } = Select;


const SearchSelect = ({ value = '', onChange, ...options }) => {

  const [list, setList] = useState([]);

  const handleSearch = (keyword) => {
    if (keyword) {
      api.issuer.userList({
        keyword,
      }).then(res => {
        setList(res.list);
      });
    };
  };
  const handleChange = (val) => {
    onChange(val);
  };

  return (
    <span>
      <Select
        showSearch
        value={value}
        style={{ width: '100%' }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        {...options}
      >
        {list.map(item =>
          <Option key={item.userId} value={item.userId}>
            <Avatar src={item.headImg} size="small" />&nbsp;&nbsp;
            {item.nickname}&nbsp;&nbsp;{item.mobile}
          </Option>
        )}
      </Select>
    </span>
  );
};


export default SearchSelect;
