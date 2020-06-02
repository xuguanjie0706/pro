import React, { useState, useEffect, useCallback } from 'react';
import CustomTable from '@/components/CustomTable';
import CustomSearchContainer from '@/components/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/CustomSearchBtnContainer';
import { Button, Avatar } from 'antd';
import api from '@/api';
import { STATUS_LIST } from '@/utils/enum';
import { connect } from 'umi';
import Search from './Search';
import ModalForm from './Form';
import LookForm from './LookForm';

const statusObj = {
  0: '暂无权益',
  1: '使用中',
  2: '已过期',
  3: '7天内到期',
  4: '30天内到期',
};
const Custom = (props) => {
  const { tagList, dispatch, otherGroupList, pkgList } = props;
  // console.log(tagList, 'table');

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [LookChild, setLookChild] = useState(null); // 查看弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值
  const [step, setStep] = useState(0);

  /* ******* 设置属性 *******  */
  // console.log(tableChild);

  /* ******* 设置实例 *******  */
  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const tableRef = (ref) => {
    setTableChild(ref);
  };

  const lookRef = (ref) => {
    setLookChild(ref);
  };

  /* ******* 设置实例 ******* */

  /* ******* 设置方法 ******* */
  /* 新增弹窗 */
  const handleEdit = async (item) => {
    setDefaultData(item);
    if (modelChild) {
      modelChild.handleShow();
    }
  };
  /* 查看弹窗 */
  const handleLook = async (item) => {
    setStep(0);
    setDefaultData(item);
    if (LookChild) {
      LookChild.handleShow();
    }
  };

  /* ******* 设置方法 ******* */
  /* 初始化 */
  const initLoad = async () => {
    dispatch({
      type: 'base/getTagList',
      payload: { type: 2 },
    });
    dispatch({
      type: 'base/getPkgList',
    });
    dispatch({
      type: 'base/getGroupList',
      payload: { type: 2 },
    });
  };
  /* ******* 监听 ******* */
  useEffect(() => {
    initLoad();
  }, []);
  /* ******* 监听 ******* */

  /* 新增按钮 */
  // const addBtn = useCallback(() => <Button style={{ marginBottom: 10 }} type="primary" onClick={() => handleEdit({ id: 0 })}>添加代理人</Button>, [modelChild]);
  /* 表单列表 */
  const SearchTable = useCallback(
    CustomSearchContainer(CustomTable, Search, CustomSearchBtnContainer()),
    [],
  );
  /* 底部按钮 */
  /* 自定义字段 */
  const columns = [
    {
      title: '用户',
      dataIndex: 'nickName',
      width: 160,
      key: 'id',
      render: (text, item) => [
        <Avatar key={item.id} size={24} src={item.headImg} style={{ marginRight: 8 }} />,
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
      render: (groupId) => (
        <span>
          {groupId
            ? otherGroupList.find((item) => item.id === groupId)
              ? otherGroupList.find((item) => item.id === groupId).name
              : '-'
            : '-'}
        </span>
      ),
    },
    {
      title: '标签',

      dataIndex: 'tagIdList',
      key: 'tagIdList',
      render: (record) => {
        if (!record) return <span />;
        // 最多只显示3个标签
        return (
          <div>
            {tagList.length > 0 &&
              record.slice(0, 3).map(
                (id) =>
                  !!tagList.find((item) => item.id === id) && (
                    <span
                      key={id}
                      style={{ display: 'inline-block' }}
                      className="padding4 margin4 bgcolor-input color-1 font-size-2"
                    >
                      {tagList.find((item) => item.id === id).name}
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
      render: (remark) => <span style={{ wordBreak: 'break-word' }}>{remark || '-'}</span>,
    },
    {
      title: '权益状态',
      dataIndex: 'privilegeStatus',
      key: 'privilegeStatus',
      width: 120,
      render: (status) => <span>{statusObj[status]}</span>,
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      width: 140,
      render: (record, item) => (
        <span>
          <Button type="link" onClick={() => handleLook(item)}>
            查看
          </Button>
          <Button type="link" onClick={() => handleEdit(item)}>
            编辑
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <SearchTable
        rowKey="id"
        STATUS_LIST={STATUS_LIST}
        request={api.chnerUserInfo.List}
        loading
        columns={columns}
        otherGroupList={otherGroupList}
        tagList={tagList}
        onTableRef={tableRef}
      />
      <ModalForm
        onRef={modelRef}
        defaultData={defaultData}
        request={api.chnerUserInfo.Update}
        callback={tableChild && tableChild.initData}
        otherGroupList={otherGroupList}
        tagList={tagList}
        dispatch={dispatch}
        isClearn={false}
      />
      <LookForm
        onRef={lookRef}
        title="拥有权益"
        defaultData={defaultData}
        request={api.cdkey.allocateUser}
        callback={tableChild && tableChild.initData}
        otherGroupList={otherGroupList}
        tagList={tagList}
        dispatch={dispatch}
        isClearn={false}
        step={step}
        pkgList={pkgList}
        footer={[
          <Button key="back" onClick={() => LookChild.handleCancle()}>
            取消
          </Button>,
          step === 1 ? (
            <Button key="submit" type="primary" onClick={() => LookChild.hangeClick()}>
              确认
            </Button>
          ) : (
              <Button type="primary" key="xuqi" onClick={() => setStep(1)}>
                {defaultData.privilegeStatus === 0 ? '分发' : '续期'}
              </Button>
            ),
        ]}
      />
    </>
  );
};

export default connect(({ base, loading }) => ({
  pkgList: base.pkgList,
  tagList: base.tagList,
  otherGroupList: base.otherGroupList,
  loading: loading.effects['base/getPkgList'],
}))(Custom);
