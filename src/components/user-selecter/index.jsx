import { Select, Avatar } from 'antd';
import api from '@/api';
import React, { Component } from 'react';


const { Option } = Select;

export default class UserSelecter extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  handleSearch = (value) => {
    if (value) {
      api.issuer.userList({
        data: {
          keyword: value,
        }
      }).then(res => {
        const options = res.list.map(item => (
          <Option value={item.userId}>
            <Avatar src={item.headImg} size="small" />&nbsp;&nbsp;
            {item.nickname}&nbsp;&nbsp;{item.mobile}
          </Option>
        ));
        this.setState({ options });
      });
    } else {
      this.setState({ options: null });
    }
  }

  handleChange = (val) => {
    this.props.onChange(val);
  }

  render() {
    return (
      <Select
        showSearch
        value={this.state.value}
        style={this.props.style ? this.props.style : { width: '100%' }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
        allowClear
      >
        {this.state.options}
      </Select>
    );
  }
}
