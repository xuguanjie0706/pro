import React, { useState, useEffect, useCallback } from 'react';
import CustomTable from '@/components/CustomTable';
import CustomSearchContainer from '@/components/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/CustomSearchBtnContainer';
import { PageLoading } from '@ant-design/pro-layout';
import { Button, Avatar } from 'antd';
import api from '@/api';
import { STATUS_LIST } from '@/utils/enum';
import { connect } from 'umi';
import Search from './Search';
import ModalForm from './Form';

const Custom = (props) => {
  const { pkgList } = props;

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值

  /* ******* 设置属性 *******  */
  console.log(tableChild);

  /* ******* 设置实例 *******  */
  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const tableRef = (ref) => {
    setTableChild(ref);
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

  /* 删除弹窗 */
  const showDelete = async (item) => {
    setDefaultData(item);
    if (deleteChild) {
      deleteChild.handleShow();
    }
  };

  /* 批量弹窗 */
  const handleAllGroup = async (type) => {
    // setDefaultDeleteData(item);
    setActionType(type);
    if (groupChild) {
      groupChild.handleShow();
    }
  };


  /* ******* 设置方法 ******* */
  /* 初始化 */
  const initLoad = async () => {
    dispatch({
      type: 'base/getGroupList',
      payload: { type: 1 }
    });
    dispatch({
      type: 'base/getPkgList'
    });
  };
  /* ******* 监听 ******* */
  useEffect(() => {
    initLoad();
  }, []);
  /* ******* 监听 ******* */

  /* 新增按钮 */
  const addBtn = useCallback(() => <Button style={{ marginBottom: 10 }} type="primary" onClick={() => handleEdit({ id: 0 })}>添加代理人</Button>, [modelChild]);
  /* 表单列表 */
  const SearchTable = useCallback(CustomSearchContainer(CustomTable, Search, CustomSearchBtnContainer(), addBtn), [addBtn]);
  /* 底部按钮 */
  /* 自定义字段 */
  const columns = [
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
          <Button type="link"
            onClick={() => handleEdit(item)}
          >
            编辑
              </Button>
          {item.cleared ? '' : (
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

  return (<>
    <SearchTable
      rowKey="id"
      STATUS_LIST={STATUS_LIST}
      request={api.chnerIssuer.List}
      loading columns={columns}
      pkgList={pkgList}
      onTableRef={tableRef}
    />
    <ModalForm
      onRef={modelRef}
      defaultData={defaultData}
      request={defaultData.id ? api.chnerIssuer.Update : api.chnerIssuer.Create}
      callback={tableChild && tableChild.initData}
      pkgList={pkgList} />
  </>);
};


export default connect(({ base, loading }) => ({ pkgList: base.pkgList, groupList: base.groupList, loading: loading.effects['base/getPkgList'] }))(Custom);
