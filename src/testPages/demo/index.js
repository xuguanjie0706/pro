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


const Custom = (props) => {
  const { pkgList, groupList, history } = props;
  const [modelChild, setModelChild] = useState(null);
  const [tableChild, setTableChild] = useState(null);
  const [deleteChild, setDeleteChild] = useState(null);
  const [defaultData, setDefaultData] = useState({ id: 0 });
  const [defaultDeleteData, setDefaultDeleteData] = useState({ id: 0 });

  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const tableRef = (ref) => {
    setTableChild(ref);
  };

  const deleteRef = (ref) => {
    setDeleteChild(ref);
  };


  const handleEdit = async (item) => {
    setDefaultData(item);
    if (modelChild) {
      modelChild.handleShow();
    }
  };

  const showDelete = async (item) => {

    setDefaultDeleteData(item);
    if (deleteChild) {
      deleteChild.handleShow();
    }
  };


  const initLoad = async () => {
    const { dispatch } = props;
    dispatch({
      type: 'base/getGroupList',
      payload: { type: 1 }
    });
    dispatch({
      type: 'base/getPkgList'
    });
  };

  useEffect(() => {
    initLoad();
  }, []);

  const addBtn = useCallback(() => <Button style={{ marginBottom: 10 }} type="primary" onClick={() => handleEdit({ id: 0 })}>添加代理人</Button>, [modelChild]);


  const SearchTable = useCallback(CustomSearchContainer(CustomTable, Search, CustomSearchBtnContainer(), addBtn), [addBtn]);

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
      pkgList={pkgList} />
    {/* <DeleteForm
      onRef={deleteRef}
      defaultData={defaultDeleteData}
      title="清退"
      request={defaultData.id ? api.chnerIssuer.Update : api.chnerIssuer.Create}
    /> */}
  </>);
};


export default connect(({ base, loading }) => ({ pkgList: base.pkgList, groupList: base.groupList, loading: loading.effects['base/getPkgList'] }))(Custom);
