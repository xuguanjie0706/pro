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
  const { pkgList, dispatch, defaultSearchData } = props;

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

  const filtername = (name) => {
    if (!name) {
      return '-';
    }
    return name.length > 5 ? `${name.slice(0, 5)}...` : name;
  };


  /* ******* 设置方法 ******* */
  /* 初始化 */
  const initLoad = async () => {
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
  // const addBtn = useCallback(() => <Button style={{ marginBottom: 10 }} type="primary" onClick={() => handleEdit({ id: 0 })}>添加代理人</Button>, [modelChild]);
  /* 表单列表 */
  const SearchTable = useCallback(CustomSearchContainer(CustomTable, Search, CustomSearchBtnContainer()), []);
  /* 底部按钮 */
  /* 自定义字段 */
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

  return (<>
    <SearchTable
      rowKey="id"
      STATUS_LIST={STATUS_LIST}
      request={api.issuer.cardIssueRecord}
      loading columns={columns}
      pkgList={pkgList}
      onTableRef={tableRef}
      defaultSearchData={defaultSearchData}
    />
    <ModalForm
      onRef={modelRef}
      defaultData={defaultData}
      request={defaultData.id ? api.chnerIssuer.Update : api.chnerIssuer.Create}
      callback={tableChild && tableChild.initData}
      pkgList={pkgList} />
  </>);
};


export default connect(({ base, loading }) => ({ pkgList: base.pkgList, loading: loading.effects['base/getPkgList'] }))(Custom);
