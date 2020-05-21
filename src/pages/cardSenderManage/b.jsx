/* eslint-disable react/no-string-refs */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import { history } from 'umi';
import { Button, Input, Table, InputNumber, Form, Select, message } from 'antd';
import { Dialog, SearchForm, DateFilter } from '@/components';
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
    parentIssuerName: '',
    issuerMobile: '',
    issuerName: '',
    groupId: '',
    total: 100,
    page: 1,
    tableData: [],
    pkgList: [],
    newGroupVisiable: false,
    deleteVisiable: false,
    groupList: [],
    selectList: [],
    handleList: [],
    dialogForm: {
      issuerName: '',
      pkgId: '',
      issuerMobile: '',
      amount: '',
      groupId: null,
    },
    newGroupDialogForm: {
      name: '',
    },
  };

  componentDidMount() {
    this.search();
    this.getPkgList();
    this.getGroupList();
  }

  onSubmit = () => {
    const { dialogForm } = this.state;
    const { refs } = this;
    refs.cardSendDialog.validateFields().then(async () => {
      if (dialogForm.id) {
        await api.chnerIssuer.Update(dialogForm);
      } else {
        await api.chnerIssuer.Create(dialogForm);
      }
      message.success('操作成功');
      this.setState({ dialogVisiable: false });
      this.search();
    });
  }

  onReceieveChange = (date, dateString) => {
    this.setState({
      receieveDate: dateString,
    });
  }

  search = async () => {
    const { issuerMobile, issuerName, receieveDate, page, parentIssuerName, groupId } = this.state;
    const res = await api.chnerIssuer.List({

      issuerMobile,
      issuerName,
      createDtBeg: receieveDate[0],
      createDtEnd: receieveDate[1],
      pageSize: 10,
      pageNum: page,
      parentIssuerName,
      groupId,

    });

    this.setState({
      tableData: res.list,
      total: res.total,
    });
  }

  closeModal = () => {
    this.setState({ dialogVisiable: false });
  }

  pagechange = async (page) => {
    await this.setState({ page });
    this.search();
  }

  reload = async () => {
    await this.setState({ page: 1 });
    this.search();
  }


  getPkgList = () => {
    api.cdkey.pkgList().then(res => {
      this.setState({ pkgList: res });
    });
  }

  getGroupList = () => {
    api.group.List({

      type: 1

    }).then(groupList => {
      this.setState({ groupList });
    });
  }

  newGroupSubmit = () => {
    const { refs } = this;
    refs.newGroupDialog.validateFields().then(values => {
      api.group.Save({

        ...values, type: 1

      }).then(() => {
        message.success('添加成功');
        this.getGroupList();
        this.setState({ newGroupVisiable: false });
      });
    });
  }

  showDetail = () => {
    // console.log(item);
  }

  showEdit = async (item) => {
    const { refs } = this;
    this.getPkgList();
    const { dialogForm } = this.state;
    await this.setState({
      dialogForm: item,
      dialogVisiable: true,
    });
    refs.cardSendDialog.setFieldsValue(dialogForm);
  }

  showDelete = (item) => {
    const { selectList } = this.state;
    if (item && item.id) {
      this.setState({
        handleList: [item.id],
        deleteVisiable: true,
      });
    } else {
      this.setState({
        handleList: selectList,
        deleteVisiable: true,
      });
    }
  }

  changeGroup = () => {
    const { selectList } = this.state;
    this.setState({
      handleList: selectList,
      groupChangeVisiable: true,
    });
  }

  confirmGroupChange = () => {
    const { changeGroupId, handleList } = this.state;
    if (!changeGroupId) {
      message.error('请选择分组');
      return;
    }
    api.chnerIssuer.batchGroupSave({

      idList: handleList,
      groupId: changeGroupId,

    }).then(() => {
      message.success('操作成功');
      this.setState({ groupChangeVisiable: false });
      this.search();
    });
  }

  confirmDelete = () => {
    const issuerIdList = this.state.handleList.map(id => {
      return this.state.tableData.find(row => row.id === id).issuerId;
    });
    api.chnerIssuer.Liquidate({ data: { issuerIdList } }).then(() => {
      message.success('操作成功');
      this.setState({ deleteVisiable: false });
      this.search();
    });
  }


  checkPhoneNub = (rule, value) => {
    const regu = '^1[0-9]{10}$';
    const re = new RegExp(regu);
    if (!re.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('请正确输入手机号！');
  }

  checkAmount = (rule, value, max) => {
    max = parseInt(max, 10) || 0;
    value = parseInt(value, 10);
    if (value % 1 !== 0) {
      return Promise.reject('请正确输入数字！');
    } if (value > max) {
      return Promise.reject('不能大于剩余数量！');
    } if (value <= 0) {
      return Promise.reject('数量不能小于1！');
    }
    return Promise.resolve();

  }

  handleSelect = (list) => {
    this.setState({ selectList: list });
  }

  async openDialog() {
    const { refs } = this;
    this.getPkgList();
    await this.setState({ dialogVisiable: true, dialogForm: {} });
    refs.cardSendDialog.setFieldsValue({
      issuerName: '',
      pkgId: '',
      issuerMobile: '',
      amount: '',
      groupId: null,
    });
  }

  render() {
    const { showEdit, showDelete } = this;
    const {
      dialogVisiable,
      groupList,
      pkgList,
      newGroupVisiable,
      newGroupDialogForm,
      deleteVisiable,
      groupChangeVisiable,
      dialogForm
    } = this.state;
    const tableTitle = [
      {
        title: '姓名',
        dataIndex: 'issuerName',
        key: 'issuerName',
      },
      {
        title: '手机号',
        dataIndex: 'issuerMobile',
        width: 140,
        key: 'issuerMobile',
      },
      {
        title: '加入时间',
        dataIndex: 'createAt',
        key: 'createAt',
      },
      {
        title: '邀请人',
        dataIndex: 'parentIssuerName',
        key: 'parentIssuerName',
      },
      {
        title: '分组',
        dataIndex: 'groupId',
        key: 'groupId',
        render: groupId => (
          <span>
            {groupId
              ? groupList.find(item => item.id === groupId)
                ? groupList.find(item => item.id === groupId).name
                : '-'
              : '-'}
          </span>
        ),
      },
      // {
      //   title: '累计分发数量',
      //   dataIndex: 'totalTimes',
      //   key: 'totalTimes',
      // },
      // {
      //   title: '剩余分发数量',
      //   dataIndex: 'surplusTimes',
      //   key: 'surplusTimes',
      // },
      {
        title: '操作',
        dataIndex: 'status',
        key: 'id',
        render: (text, item) => (
          <span key={text}>
            <Button
              type="link"
              onClick={() =>
                history.push(
                  `/rights/cardSenderDetail?id=${item.issuerId}&name=${item.issuerName}&createat=${item.createAt}`,
                )
              }
            >
              详情
            </Button>
            <Button type="link" onClick={() => showEdit(item)}>
              编辑
            </Button>
            {item.cleared ? (
              ''
            ) : (
                <Button
                  type="link"
                  style={{ color: '#666666' }}
                  onClick={() => showDelete(item)}
                >
                  清退
                </Button>
              )}
          </span>
        ),
      },
    ];

    return (
      <div>
        <div className={styles.box}>
          {/* <TitleCard title="分发列表" /> */}
          <div className={styles.boxContainer}>
            <Button onClick={this.openDialog} type="primary">
              添加代理人
            </Button>
          </div>
          <div className={styles.boxContainer}>
            <SearchForm labelWidth={80}>
              <div span={24} label="加入时间：">
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
              <div span={6} label="姓名：">
                <Input
                  value={this.state.issuerName}
                  onChange={e => this.setState({ issuerName: e.target.value })}
                />
              </div>
              <div span={6} label="手机号：">
                <Input
                  value={this.state.issuerMobile}
                  onChange={e =>
                    this.setState({ issuerMobile: e.target.value })
                  }
                />
              </div>
              <div span={6} label="邀请人：">
                <Input
                  value={this.state.parentIssuerName}
                  onChange={e =>
                    this.setState({ parentIssuerName: e.target.value })
                  }
                />
              </div>
              <div span={6} label="所属分组：">
                <Select
                  value={this.state.groupId}
                  style={{ width: '100%' }}
                  allowClear
                  onChange={value =>
                    this.setState({
                      groupId: value,
                    })
                  }
                >
                  {groupList.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div span={7} label="  ">
                <Button type="primary" onClick={this.reload}>
                  筛选
                </Button>
              </div>
            </SearchForm>

            <Table
              dataSource={this.state.tableData}
              columns={tableTitle}
              rowSelection={{
                type: 'checkbox',
                onChange: this.handleSelect,
              }}
              rowKey="id"
              pagination={{
                total: this.state.total,
                showQuickJumper: true,
                showSizeChanger: false,
                current: this.state.page,
                onChange: this.pagechange,
              }}
              footer={() => (
                <div style={{ backgroundColor: '#fff' }}>
                  <Button
                    key="1"
                    style={{ marginRight: 15 }}
                    disabled={this.state.selectList.length === 0}
                    type="default"
                    onClick={this.showDelete}
                  >
                    批量清退
                  </Button>
                  <Button
                    key="2"
                    type="default"
                    onClick={this.changeGroup}
                    disabled={this.state.selectList.length === 0}
                  >
                    批量分组
                  </Button>
                </div>
              )}
            />
          </div>
        </div>

        <Dialog
          visible={dialogVisiable}
          onClose={this.closeModal}
          title={dialogForm.id ? '编辑' : '添加代理人'}
          footer={[
            <Button key="2" type="default" onClick={this.closeModal}>
              取消
            </Button>,
            <Button key="1" type="primary" onClick={this.onSubmit}>
              确认
            </Button>,
          ]}
        >
          <Form
            initialValues={dialogForm}
            onFinish={this.onSubmit}
            ref="cardSendDialog"
            labelCol={{ span: 8 }}
          >
            {!dialogForm.id && (
              <Form.Item
                label="权益包："
                name="pkgId"
                labelCol={{ span: 4 }}
                style={{ width: '100%', float: 'left' }}
                rules={[{ required: true, message: '请选择权益包' }]}
              >
                <Select
                  value={dialogForm.pkgId}
                  style={{ maxWidth: 394 }}
                  onChange={value =>
                    this.setState({
                      dialogForm: {
                        ...dialogForm,
                        pkgId: value,
                        pkgAmount: pkgList.find(item => item.pkgId === value)
                          .amount,
                      },
                    })
                  }
                >
                  {pkgList.map(item => (
                    <Option key={item.pkgId} value={item.pkgId}>
                      {item.pkgName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              label="姓名："
              name="issuerName"
              style={{ width: 240, float: 'left' }}
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input
                value={dialogForm.issuerName}
                maxLength={10}
                onChange={e =>
                  this.setState({
                    dialogForm: {
                      ...dialogForm,
                      issuerName: e.target.value,
                    },
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="手机号："
              name="issuerMobile"
              style={{ width: 240, float: 'left' }}
              rules={[{ validator: this.checkPhoneNub, required: true }]}
            >
              <Input
                value={dialogForm.issuerMobile}
                maxLength={11}
                disabled={!!dialogForm.id}
                style={{ maxWidth: 156 }}
                onChange={e =>
                  this.setState({
                    dialogForm: {
                      ...dialogForm,
                      issuerMobile: e.target.value,
                    },
                  })
                }
              />
            </Form.Item>
            {dialogForm.id && (
              <Form.Item
                label="分组："
                name="groupId"
                style={{ width: 240, float: 'left' }}
              >
                <Select
                  value={dialogForm.groupId}
                  style={{ maxWidth: 156 }}
                  dropdownClassName={styles.cardSenderGroupSelect}
                  onChange={value =>
                    this.setState({
                      dialogForm: { ...dialogForm, groupId: value },
                    })
                  }
                >
                  {groupList.map(item => (
                    <Option
                      key={item.id}
                      value={item.id}
                      className="selectOption"
                    >
                      {item.name}
                    </Option>
                  ))}
                  <Option
                    value=""
                    className="selectOption addNewOption"
                    style={{ backgroundColor: '#F4F4F4', marginTop: 8 }}
                  >
                    <div
                      onClick={() =>
                        this.setState({
                          newGroupVisiable: true,
                          newGroupDialogForm: { name: '' },
                        })
                      }
                    >
                      添加分组
                    </div>
                  </Option>
                </Select>
              </Form.Item>
            )}
            {!dialogForm.id && (
              <Form.Item
                label={
                  <span>
                    <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>
                    <span>数量</span>
                  </span>
                }
                style={{ width: 240 }}
              >
                <Form.Item
                  name="amount"
                  rules={[
                    {
                      validator: (rule, value) =>
                        this.checkAmount(
                          rule,
                          value,
                          dialogForm.pkgAmount,
                        ),
                    },
                  ]}
                >
                  <InputNumber
                    value={dialogForm.amount}
                    style={{ width: '100%' }}
                    precision={0}
                    // max={dialogForm.pkgAmount || 0}
                    onChange={e =>
                      this.setState({
                        dialogForm: {
                          ...dialogForm,
                          amount: e,
                        },
                      })
                    }
                  />
                </Form.Item>
                <span
                  style={{
                    position: 'absolute',
                    right: 6,
                    top: 5,
                    color: '#999999',
                    cursor: 'default',
                  }}
                >
                  剩余{dialogForm.pkgAmount || 0}
                </span>
              </Form.Item>
            )}
            <div style={{ clear: 'both' }} />
          </Form>
        </Dialog>

        <Dialog
          visible={newGroupVisiable}
          onClose={() => this.setState({ newGroupVisiable: false })}
          title="添加分组"
          footer={[
            <Button
              key="2"
              type="default"
              onClick={() => this.setState({ newGroupVisiable: false })}
            >
              取消
            </Button>,
            <Button
              key="1"
              type="primary"
              onClick={this.newGroupSubmit}
            >
              确认
            </Button>,
          ]}
        >
          <Form
            initialValues={this.state.newGroupDialog}
            ref="newGroupDialog"
            labelCol={{ span: 8 }}
          >
            <Form.Item
              label="分组名称："
              name="name"
              style={{ width: 220 }}
              rules={[{ required: true, message: '请输入分组名称' }]}
            >
              <Input
                value={newGroupDialogForm.name}
                maxLength={20}
                onChange={e =>
                  this.setState({
                    newGroupDialogForm: {
                      ...newGroupDialogForm,
                      name: e.target.value,
                    },
                  })
                }
              />
            </Form.Item>
          </Form>
        </Dialog>
        <Dialog
          visible={deleteVisiable}
          onClose={() => this.setState({ deleteVisiable: false })}
          title="清退"
          footer={[
            <Button
              key="2"
              type="default"
              onClick={() => this.setState({ deleteVisiable: false })}
            >
              取消
            </Button>,
            <Button
              key="1"
              type="primary"
              onClick={this.confirmDelete}
            >
              确认
            </Button>,
          ]}
        >
          清退后代理人将不再拥有发卡权限，是否确认清退？
        </Dialog>

        <Dialog
          visible={groupChangeVisiable}
          onClose={() => this.setState({ groupChangeVisiable: false })}
          title="分组"
          footer={[
            <Button
              key="2"
              type="default"
              onClick={() => this.setState({ groupChangeVisiable: false })}
            >
              取消
            </Button>,
            <Button
              key="1"
              type="primary"
              onClick={this.confirmGroupChange}
            >
              确认
            </Button>,
          ]}
        >
          <div>
            分组：
            <Select
              value={this.state.changeGroupId}
              style={{ width: 180 }}
              dropdownClassName={styles.cardSenderGroupSelect}
              onChange={value =>
                this.setState({
                  changeGroupId: value,
                })
              }
            >
              {groupList.map(item => (
                <Option key={item.id} value={item.id} className="selectOption">
                  {item.name}
                </Option>
              ))}
              <Option
                value=""
                className="selectOption addNewOption"
                style={{ backgroundColor: '#F4F4F4' }}
              >
                <div
                  onClick={() =>
                    this.setState({
                      newGroupVisiable: true,
                      newGroupDialogForm: { name: '' },
                    })
                  }
                >
                  添加分组
                </div>
              </Option>
            </Select>
          </div>
        </Dialog>
      </div>
    );
  }
}
