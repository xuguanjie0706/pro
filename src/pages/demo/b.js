import React, { useState, useMemo } from 'react';
import CustomTable from '@/components/CustomTable';
import CustomSearchContainer from '@/components/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/CustomSearchBtnContainer';
import { Button } from 'antd';
import api from '@/api';
import Search from './Search';
import ModalForm from './Form';

const Custom = () => {

  const [modelChild, setModelChild] = useState(null);
  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const handleClick = () => {
    if (modelChild) {
      modelChild.handleShow();
    }
  };
  const addBtn = () => <Button style={{ marginBottom: 10 }} type="primary" onClick={handleClick}>添加代理人</Button>;
  const SearchTable = useMemo(() => CustomSearchContainer(CustomTable, Search, CustomSearchBtnContainer(), addBtn), [addBtn]);
  const columns = [
    {
      title: '手机号',
      dataIndex: 'userMobile',
      width: 140,
      key: 'userMobile',
    },
    {
      title: '手机号',
      dataIndex: 'userMobile',
      render: () => <Button onClick={() => modelChild.handleShow()} > 12321</Button >
    },
  ];
  return <>
    <SearchTable rowKey="id" request={api.chnerUserInfo.List} loading columns={columns} />
    <ModalForm onRef={modelRef} />
  </>;
};

export default Custom;
