import React from 'react';
import { Button, Input, Table, Select, Avatar } from 'antd';
import {
  Dialog,
  SearchForm,
  DateFilter,
  UserSelect,
} from '@/components';
import api from '@/api';
import styles from './index.less';

const { Option } = Select;

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    dialogVisiable: false,
    receieveDate: '',
    issuerName: '',
    total: 0,
    page: 1,
    statusList: [
      null,
      '未领取',
      '待激活',
      '使用中',
      '已过期',
      '7天内到期',
      '30天内到期',
    ],
    pkgList: [],
    tableData: [],
  };

  async componentDidMount() {
    await this.getPkgList();
    this.search();
  }

  async getPkgList() {
    const res = await api.cdkey.pkgList({ data: {} });
    await this.setState({ pkgList: res });
  }

  openDialog = () => {
    this.setState({ dialogVisiable: true });
  }

  onReceieveChange = (date, dateString) => {
    this.setState({
      receieveDate: dateString,
    });
  }

  closeModal = () => {
    this.setState({ dialogVisiable: false });
  }


  reload = async () => {
    await this.setState({ page: 1 });
    this.search();
  }

  search = async () => {
    const { userId, receieveDate, page, issuerName, pkgId, status, statusList } = this.state;
    const res = await api.issuer.cardIssueRecord({
      data: {
        issuerId: this.props.id,
        userId,
        startTime: receieveDate[0],
        endTime: receieveDate[1],
        pageSize: 10,
        pageNum: page,
        issuerName,
        pkgId,
        status,
      }
    });


    res.list.forEach(item => {
      const it = { ...item };
      it.status = statusList[it.status];
      return it;
    });

    res.list.forEach(item => {
      const it = item;
      it.status = statusList[it.status];
    });
    this.setState({
      tableData: res.list,
      total: res.total,
    });

  }

  pagechange = async (page) => {
    await this.setState({ page });
    this.search();
  }


  filtername = (name) => {
    if (!name) {
      return '-';
    }
    return name.length > 5 ? `${name.slice(0, 5)}...` : name;
  }

  async userSearchChange(id) {
    await this.setState({
      userId: id,
    });
    this.reload();
  }


  render() {
    const tableTitle = [
      {
        title: '卡号',
        dataIndex: 'cardNo',
        width: 110,
        key: 'cardNo',
      },
      {
        title: '用户',
        dataIndex: 'nickName',
        key: 'nickName',
        width: 160,
        render: (text, item) => (
          <div title={text}>
            <Avatar
              key={item.cardNo}
              src={item.userAvatar}
              size={24}
              style={{ marginRight: 8 }}
            />
            <span key={text}>{this.filtername(text)}</span>
          </div>
        ),
      },
      {
        title: '发卡时间',
        dataIndex: 'issueTime',
        key: 'issueTime',
      },
      // {
      //   title: '分组',
      //   dataIndex: 'groupName',
      //   key: 'groupName',
      // },
      {
        title: '领取手机号',
        dataIndex: 'userMobile',
        width: 140,
        key: 'userMobile',
      },
      {
        title: '套餐名称',
        dataIndex: 'pkgName',
        key: 'pkgName',
      },
      {
        title: '代理人',
        dataIndex: 'issuerName',
        key: 'issuerName',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '备注',
        ellipsis: true,
        dataIndex: 'remark',
        key: 'remark',
      },
    ];
    return (
      <div>
        {/* <div className={styles.box}>
          <RightSuit />
        </div> */}
        <div className={styles.box}>
          <div className={styles.boxContainer}>
            <SearchForm labelWidth={80}>
              <div span={24} label="发卡时间：">
                <DateFilter
                  ranges={{
                    昨天: [-1, -1],
                    今天: [0, 0],
                    近7天: [-6, 0],
                    近30天: [-29, 0],
                  }}
                  defaultValue={['', '']}
                  onChange={this.onReceieveChange}
                />
              </div>
              <div span={6} label="状态：">
                <Select
                  value={this.state.status}
                  placeholder="请选择状态"
                  style={{ width: '100%' }}
                  allowClear
                  onChange={value =>
                    this.setState({
                      status: value,
                    })
                  }
                >
                  {this.state.statusList.map(
                    (item, key) =>
                      item && (
                        <Option key={item} value={key}>
                          {item}
                        </Option>
                      ),
                  )}
                </Select>
              </div>
              <div span={6} label="套餐：">
                <Select
                  value={this.state.pkgId}
                  placeholder="请选择套餐"
                  style={{ width: '100%' }}
                  allowClear
                  onChange={value =>
                    this.setState({
                      pkgId: value,
                    })
                  }
                >
                  {this.state.pkgList &&
                    this.state.pkgList.length &&
                    this.state.pkgList.map(item => (
                      <Option key={item.pkgId} value={item.pkgId}>
                        {item.pkgName}
                      </Option>
                    ))}
                </Select>
              </div>
              <div span={6} label="用户：">
                {/* <Input
                  value={this.state.nickName}
                  onChange={e => this.setState({ nickName: e.target.value })}
                ></Input>
                 */}
                <UserSelect onChange={this.userSearchChange} />
              </div>
              {/* <div span={6} label="手机号：">
                <Input
                  value={this.state.userMobile}
                  onChange={e => this.setState({ phone: e.target.value })}
                ></Input>
              </div> */}
              {!this.props.id && (
                <div span={6} label="代理人：">
                  <Input
                    value={this.state.issuerName}
                    allowClear
                    onChange={e =>
                      this.setState({ issuerName: e.target.value })
                    }
                  />
                </div>
              )}
              <div span={24} label=" ">
                <Button type="primary" onClick={this.reload}>
                  筛选
                </Button>
              </div>
            </SearchForm>

            <Table
              dataSource={this.state.tableData}
              columns={tableTitle}
              rowKey="id"
              pagination={{
                total: this.state.total,
                showQuickJumper: true,
                showSizeChanger: false,
                current: this.state.page,
                onChange: this.pagechange.bind(this),
              }}
            />
          </div>
        </div>

        <Dialog
          visible={this.state.dialogVisiable}
          onClose={this.closeModal}
          title="弹窗测试"
          footer={[
            <Button type="default" onClick={this.closeModal}>
              取消
            </Button>,
            <Button type="primary" onClick={this.closeModal}>
              确认
            </Button>,
          ]}
        />
      </div>
    );
  }
}
