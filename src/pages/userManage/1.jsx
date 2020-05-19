import React from 'react';
import {
  Table,
  Input,
  Button,
  Select,
  Row,
  Col,
  Avatar,
  message,
  Form,
} from 'antd';
import './index.less';
import { SearchForm, DateFilter, Dialog, UserSelect } from '@/components';
import api from '@/api';

const deleteIcon = require('@/assets/img/common/tag_delete.png');

const { Option } = Select;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.dataSource,
      receieveDate: '',
      groupList: [],
      tagList: [],
      userData: {},
      pkgList: [],
      total: 0,
      page: 1,
      newTagList: [],
      detailVisible: false,
      updateVisible: false,
      newGroupVisiable: false,
      newGroupDialogForm: {
        name: '',
      },
      restAmount: 0,
    };
  }

  componentDidMount() {
    this.getGroupList();
    this.getTagList();
    this.search();
  }

  onReceieveChange = (date, dateString) => {
    this.setState({
      receieveDate: dateString,
    });
  }

  onShowUpdate = (flag) => {
    this.setState({
      updateVisible: flag,
    });
  }

  getPkgList = async () => {
    const { userData } = this.state;
    const res = await api.cdkey.pkgList({ chnerUserId: userData.id, }) || [];
    const pkgId = res[0].pkgId || '';
    const restAmount = res[0].amount || 0;
    this.setState({ pkgList: res, pkgId, restAmount });
  }

  showAddTag = () => {
    if (this.state.newTagList.length >= 3) {
      message.info('最多只能添加3个标签');
      return;
    }
    this.setState({
      tagSelectVisiable: true,
    });

  }

  addTagChange = (val, val1) => {
    const { newTagList } = this.state;
    if (val1[0].value) {
      newTagList.push({ name: val1[0].children, id: val1[0].value });
      this.setState({
        tagSelectVisiable: false,
        newTagList,
        userChanged: true,
      });
      return;
    }
    api.tag.Save({
      type: 2,
      name: val[0],
    }).then(res => {
      newTagList.push(res);
      this.setState({
        tagSelectVisiable: false,
        newTagList,
        userChanged: true,
      });
      this.getTagList();
    });
  }

  confirmAdd = () => {
    if (!this.state.pkgId) {
      return;
    }
    api.cdkey.allocateUser({
      data: {
        chnerUserId: this.state.userData.id,
        pkgId: this.state.pkgId,
        remark: this.state.remark,
        issueType: 4,
      }
    })
      .then(() => {
        message.success('操作成功');
        this.setState({ detailVisible: false });
        this.search();
      });
  }

  editConfirm = () => {
    const { remark, newGroupId, newTagList, userData } = this.state;
    if (remark && remark.length > 120) {
      message.info('备注不能超过120个字');
      return;
    }
    api.chnerUserinfo.Update({
      groupId: newGroupId,
      remark,
      tagIdList: newTagList.map(item => item.id),
      id: userData.id,
    })
      .then(() => {
        message.success('操作成功');
        this.setState({ updateVisible: false });
        this.search();
      });
  }


  hideDetail = () => {
    this.setState({
      detailVisible: false,
      remark: '',
      userData: {},
    });
  }

  showDetail = async (item) => {
    this.getPkgList();
    await this.setState({
      userData: item,
      detailVisible: true,
      step: 0,
    });
  }

  showUpdate = async (item) => {
    const taglist = [];
    item.tagIdList = item.tagIdList || [];
    item.tagIdList.forEach(id => {
      const element = this.state.tagList.find(item => item.id === id);
      if (element) {
        taglist.push(element);
      }
    });
    await this.setState({
      userData: item,
      updateVisible: true,
      userChanged: false,
      remark: item.remark,
      newGroupId: item.groupId,
      newTagList: taglist,
    });
  }

  deleteTag = (key) => {
    const { newTagList } = this.state;
    newTagList.splice(key, 1);
    this.setState({ newTagList });
  }


  pagechange = async (page) => {
    await this.setState({ page });
    this.search();
  }

  reload = async () => {
    await this.setState({ page: 1 });
    this.search();
  }

  userSearchChange = async (id) => {
    await this.setState({
      userId: id,
    });
    this.reload();
  }

  search = () => {
    const { receieveDate, page, userId, tagId, groupId } = this.state;
    api.chnerUserInfo.List({
      pageNum: page,
      pageSize: 10,
      createDtBeg: receieveDate[0],
      createDtEnd: receieveDate[1],
      userId,
      tagId,
      groupId,
    })
      .then(res => {
        this.setState({ dataSource: res.list, total: res.tatal });
      });
  }

  getTagList = () => {
    api.tag.List({
      type: 2
    }).then(res => {
      this.setState({
        tagList: res || [],
      });
    });
  }


  getGroupList = () => {
    api.group.List({
      type: 2
    }).then(groupList => {
      this.setState({ groupList });
    });
  }

  newGroupSubmit = () => {
    this.refs.newGroupDialog.validateFields().then(values => {
      api.group.Save({ ...values, type: 2 }).then(() => {
        message.success('添加成功');
        this.getGroupList();
        this.setState({ newGroupVisiable: false });
      });
    });
  }

  render() {
    const {
      dataSource,
      detailVisible,
      updateVisible,
      newGroupVisiable,
      newGroupDialogForm,
      pkgList
    } = this.state;
    // NO_PRIVILEGE("暂无权益", 0),
    // USE("使用中", 1),
    // OVERDUE("已过期", 2),
    // SEVEN_OVERDUE("7天内到期", 3),
    // THIRTY_OVERDUE("30天内到期", 4);
    const statusObj = {
      0: '暂无权益',
      1: '使用中',
      2: '已过期',
      3: '7天内到期',
      4: '30天内到期',
    };

    const columns = [
      {
        title: '用户',
        dataIndex: 'nickName',
        width: 160,
        key: 'id',
        render: (text, item) => [
          <Avatar
            key={item.id}
            size={24}
            src={item.headImg}
            style={{ marginRight: 8 }}
          />,
          <span key={text}>{text || '-'}</span>,
        ],
      },
      {
        title: '手机号',
        dataIndex: 'userMobile',
        width: 140,
        key: 'userMobile',
      },
      {
        title: '加入时间',
        dataIndex: 'createAt',
        width: 200,
        key: 'createAt',
      },
      {
        title: '所属分组',
        dataIndex: 'groupId',
        width: 120,
        key: 'groupId',
        render: groupId => (
          <span>
            {groupId
              ? this.state.groupList.find(item => item.id === groupId)
                ? this.state.groupList.find(item => item.id === groupId).name
                : '-'
              : '-'}
          </span>
        ),
      },
      {
        title: '标签',
        dataIndex: 'tagIdList',
        key: 'tagIdList',
        render: record => {
          if (!record) return <span />;
          // 最多只显示3个标签
          return (
            <div>
              {this.state.tagList.length > 0 &&
                record.slice(0, 3).map(
                  id =>
                    !!this.state.tagList.find(item => item.id === id) && (
                      <span
                        key={id}
                        style={{ display: 'inline-block' }}
                        className="padding4 margin4 bgcolor-input color-1 font-size-2"
                      >
                        {this.state.tagList.find(item => item.id === id).name}
                      </span>
                    ),
                )}
            </div>
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        ellipsis: true,
        render: remark => (
          <span style={{ wordBreak: 'break-word' }}>{remark || '-'}</span>
        ),
      },
      {
        title: '权益状态',
        dataIndex: 'privilegeStatus',
        key: 'privilegeStatus',
        width: 120,
        render: status => <span>{statusObj[status]}</span>,
      },
      {
        title: '操作',
        key: 'action',
        width: 120,
        render: (record, item) => (
          <span>
            <Button type="link" onClick={this.showDetail(item)}>
              查看
            </Button>
            <Button type="link" onClick={this.showUpdate(item)}>
              编辑
            </Button>
          </span>
        ),
      },
    ];
    return (
      <div>
        <div>
          <SearchForm
            labelWidth={80}
            backgroundColor="#fff"
            style={{ borderRadius: '8px' }}
          >
            <div span={24} label="领取时间：">
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
            <div span={6} label="用户：">
              <UserSelect onChange={this.userSearchChange} />
            </div>
            {/* <div span={6} label="手机号：">
              <Input
                onChange={e => this.setState({ userMobile: e.target.value })}
              ></Input>
            </div> */}
            <div span={6} label="所属分组：">
              <Select
                allowClear
                defaultValue=""
                onChange={e => this.setState({ groupId: e })}
                className="width100"
              >
                {this.state.groupList.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div span={6} label="标签：">
              <Select
                allowClear
                defaultValue=""
                onChange={e => this.setState({ tagId: e })}
                className="width100"
              >
                {this.state.tagList.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div span={24}>
              <Button onClick={this.reload} type="primary">
                筛选
              </Button>
            </div>
          </SearchForm>
        </div>
        <div className="padding16 margin-tio16 bgcolor-white radius8 userTable">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={dataSource}
            pagination={{
              total: this.state.total,
              showSizeChanger: false,
              showQuickJumper: true,
              current: this.state.page,
              onChange: this.pagechange,
            }}
          />
        </div>
        <Dialog
          visible={detailVisible}
          title="拥有权益"
          onClose={this.hideDetail}
          footer={[
            <Button key="back" onClick={this.hideDetail}>
              取消
            </Button>,
            this.state.step === 1 ? (
              <Button
                key="submit"
                type="primary"
                onClick={this.confirmAdd}
              >
                {this.state.step === 1 ? '确认' : '续期'}
              </Button>
            ) : (
                <Button
                  type="primary"
                  key="xuqi"
                  onClick={() => this.setState({ step: 1 })}
                >
                  {this.state.userData.privilegeStatus === 0 ? '分发' : '续期'}
                </Button>
              ),
          ]}
        >
          {this.state.step !== 1 && (
            <div style={{ width: '100%' }}>
              {this.state.userData.privilegeList &&
                this.state.userData.privilegeList.map((item, key) => (
                  <div className="rightbox" key={key}>
                    <div className="right1">
                      <span className="righttitle">{item.cardName}</span>
                      <span className="rightdate">
                        {!!item.privilegeRemainDays && (
                          <span>剩余有效期：{item.privilegeRemainDays}天</span>
                        )}
                        {!!item.privilegeRemainTimes && (
                          <span style={{ marginLeft: 14 }}>
                            剩余次数：{item.privilegeRemainTimes}次
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="right2">{item.cardDesc}</div>
                  </div>
                ))}
              {!this.state.userData.privilegeList && '用户当前暂无权益'}
            </div>
          )}
          {this.state.step === 1 && (
            <div style={{ display: 'block', width: '100%' }}>
              <div style={{ marginBottom: 20 }}>
                <span style={{ display: 'inline-block', width: 100 }}>
                  选择套餐：
                </span>
                <Select
                  style={{ width: 180 }}
                  value={this.state.pkgId}
                  onChange={e => {
                    const obj = pkgList.find(
                      item => item.pkgId === e,
                    );
                    console.log(e, obj);
                    this.setState({
                      pkgId: e,
                      restAmount: obj ? obj.amount : 0,
                    });
                  }}
                >
                  {this.state.pkgList.map(item => (
                    <Option
                      value={item.pkgId}
                      key={item.pkgId}
                      title={item.pkgName}
                    >
                      {item.pkgName}
                    </Option>
                  ))}
                </Select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 100,
                    verticalAlign: 'top',
                  }}
                >
                  备注：
                </span>
                <Input.TextArea
                  style={{ width: 180 }}
                  value={this.state.remark}
                  maxLength={20}
                  onChange={e => this.setState({ remark: e.target.value })}
                />
              </div>
              <span style={{ color: '#F64444', marginLeft: 100 }}>*</span>
              <span>向用户发送一次所选中套餐，剩余{this.state.restAmount}</span>
            </div>
          )}
        </Dialog>
        <Dialog
          visible={updateVisible}
          title="用户编辑"
          onClose={() => this.setState({ updateVisible: false })}
          footer={[
            <Button
              key="back"
              onClick={() => this.setState({ updateVisible: false })}
            >
              取消
            </Button>,
            <Button
              key="submit"
              onClick={this.editConfirm}
              disabled={!this.state.userChanged}
              type="primary"
            >
              确认
            </Button>,
          ]}
        >
          <Row>
            <Col span={24} style={{ marginBottom: 20 }}>
              <div style={{ display: 'inline-block', width: 80 }}>分组：</div>
              <Select
                style={{ width: 180 }}
                allowClear
                value={this.state.newGroupId}
                onChange={e =>
                  this.setState({ newGroupId: e, userChanged: true })
                }
                className="width100"
              >
                {this.state.groupList.map(item => (
                  <Option
                    value={item.id}
                    key={item.id}
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
                        newGroupId: null,
                        newGroupDialogForm: { name: '' },
                      })
                    }
                  >
                    添加分组
                  </div>
                </Option>
              </Select>
            </Col>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: 'inline-block',
                  width: 80,
                  verticalAlign: 'top',
                }}
              >
                标签
              </div>
              <div style={{ display: 'inline-block', width: 350 }}>
                {this.state.newTagList.map(
                  (item, key) =>
                    item && (
                      <span
                        key={item.id}
                        style={{ marginLeft: key === 0 ? 0 : 5, fontSize: 14 }}
                        className="bgcolor-input color-1 font-size-2 padding4 margin4"
                      >
                        {item.name}
                        <img
                          alt=""
                          src={deleteIcon}
                          style={{
                            width: 12,
                            height: 12,
                            cursor: 'pointer',
                            marginLeft: 16,
                            marginTop: -3,
                          }}
                          onClick={this.deleteTag.bind(this, key)}
                        />
                      </span>
                    ),
                )}

                {this.state.tagSelectVisiable ? (
                  <Select
                    style={{ width: 120 }}
                    onBlur={() => this.setState({ tagSelectVisiable: false })}
                    onChange={this.addTagChange}
                    mode="tags"
                  >
                    {this.state.tagList.map(
                      item =>
                        this.state.newTagList.find(
                          tag => tag.id === item.id,
                        ) === undefined && (
                          <Option value={item.id}>{item.name}</Option>
                        ),
                    )}
                  </Select>
                ) : (
                    <span
                      className="bgcolor-input color-1 font-size-2 padding4 margin4"
                      style={{
                        marginLeft: this.state.newTagList.length === 0 ? 0 : 4,
                        cursor: 'pointer',
                      }}
                      onClick={this.showAddTag}
                    >
                      添加标签
                    </span>
                  )}
              </div>
            </div>
            <Col span={24}>
              <div
                style={{
                  display: 'inline-block',
                  width: 80,
                  verticalAlign: 'top',
                }}
              >
                备注：
              </div>
              <Input.TextArea
                style={{ width: 350 }}
                value={this.state.remark}
                autoSize
                allowClear
                maxLength={20}
                onChange={e =>
                  this.setState({ remark: e.target.value, userChanged: true })
                }
              />
            </Col>
          </Row>
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
      </div>
    );
  }
}
