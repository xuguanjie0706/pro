import React, { useState, useMemo, useEffect } from 'react';
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
  const { pkgList, loading } = props;
  const [modelChild, setModelChild] = useState(null);
  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const handleClick = () => {
    if (modelChild) {
      modelChild.handleShow();
    }
  };
  const filtername = (name) => {
    if (!name) {
      return '-';
    }
    return name.length > 5 ? `${name.slice(0, 5)}...` : name;
  };


  const initLoad = async () => {
    const { dispatch } = props;
    await dispatch({
      type: 'base/getPkgList'
    });
  };

  useEffect(() => {
    initLoad();
  }, []);

  const addBtn = useMemo(() => () => <Button style={{ marginBottom: 10 }} type="primary" onClick={handleClick}>添加代理人</Button>, [pkgList]);
  const SearchTable = useMemo(() => {
    return loading === false ? CustomSearchContainer(CustomTable, Search, CustomSearchBtnContainer(), addBtn) : PageLoading;
  }, [loading]);
  const columns = [
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
          <span key={text}>{filtername(text)}</span>
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
      render: (text) => <span >{STATUS_LIST[text]}</span>
    },
    {
      title: '备注',
      ellipsis: true,
      dataIndex: 'remark',
      key: 'remark',
    },
  ];
  return <>
    <SearchTable rowKey="id" STATUS_LIST={STATUS_LIST} request={api.issuer.cardIssueRecord} loading columns={columns} pkgList={pkgList} />
    <ModalForm onRef={modelRef} />
  </>;
};


export default connect(({ base, loading }) => ({ pkgList: base.pkgList, loading: loading.effects['base/getPkgList'] }))(Custom);
