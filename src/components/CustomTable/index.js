/**
 * @description: 自定义表格组件
 * @param {type}
 *
 * ${isSelect}
 * ${FooterComponent}
 * ${defaultExpandAllRows}
 * ${expandedRowRender}
 * ${Gateway} ${Action}
 * ${columns}
 * ${isOnline}
 * @return:
 */

import React, { Component } from 'react';
import { Table, Pagination } from 'antd';

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
      page: 1,
      loading: true,
      // id: null,
      // detailData: {
      //   enable: true
      // },
      list: [],
      selectedKey: []
    };
  }

  componentDidMount() {
    const { onTableRef, onFatherRef } = this.props;
    onTableRef && onTableRef(this);
    onFatherRef && onFatherRef(this);
    this.outInitData = setTimeout(() => {
      this.initData();
    }, 0);
  }


  componentWillUnmount() {
    clearTimeout(this.outInitData);
  }

  cleanSelectedKey = () => {
    this.setState({
      selectedKey: []
    });
  };

  initData = async value => {
    const { defaultSearchData, form, request } = this.props;
    const { page, count } = this.state;
    const data = {
      page, count, ...value, ...defaultSearchData
    };
    this.setState({
      loading: true,
      // page: data.page
    });
    //     if (request) {
    const dataResourse = await request(data);
    this.setState({
      list: dataResourse.list,
      total: dataResourse.total || 0,
      loading: false
    });
  };

  onShowSizeChange = (page, pageSize) => {
    this.setState(
      {
        page: 1,
        count: pageSize
      },
      () => this.initData()
    );
  };

  pageChange = page => {
    this.setState(
      {
        page
      },
      () => this.initData()
    );
  };

  render() {
    const { count, total, list, loading, selectedKey, page } = this.state;
    const paginationData = {
      defaultCurrent: 1,
      current: page,
      defaultPageSize: count,
      showSizeChanger: true,
      total,
      onShowSizeChange: this.onShowSizeChange,
      onChange: this.pageChange,
      size: 'middle',
      showQuickJumper: true
    };
    const {
      columns,
      expandedRowRender,
      defaultExpandAllRows,
      isSelect,
      FooterComponent,
      rowKey = '_id'
    } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedKey: selectedRowKeys
        });
      },
      selectedRowKeys: selectedKey
    };
    const footer = () => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {FooterComponent} <Pagination {...paginationData} />
      </div>
    );
    return (
      <Table
        defaultExpandAllRows={defaultExpandAllRows}
        expandedRowRender={expandedRowRender}
        columns={columns}
        loading={loading}
        dataSource={list}
        rowKey={rowKey}
        size="middle"
        pagination={FooterComponent ? false : paginationData}
        rowSelection={isSelect ? rowSelection : null}
        footer={FooterComponent ? footer : null}
      />
    );
  }
}


export default CustomTable;
