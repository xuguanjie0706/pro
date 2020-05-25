/*
 * @Author: xgj
 * @since: 2020-05-23 09:27:06
 * @lastTime: 2020-05-25 11:32:36
 * @LastAuthor: xgj
 * @FilePath: /mui-demo/src/pages/extensionView/index.js
 * @message:推广
 */
import React, { useEffect, useCallback, useState } from 'react';
import CustomTable from '@/components/CustomTable';
import CustomTabsTable from '@/components/CustomTabsTable';
import CustomSearchContainer from '@/components/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/CustomSearchBtnContainer';
import { Button } from 'antd';
import api from '@/api';
import { STATUS_LIST } from '@/utils/enum';
import { connect } from 'umi';
import Search from './Search';
import ModalForm from './Form';
import ToolForm from './ToolForm';

const Custom = (props) => {
  const { pkgList, dispatch, defaultSearchData } = props;

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [ToolChild, setToolChild] = useState(null); // 列表弹窗
  const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值

  /* ******* 设置属性 *******  */

  /* ******* 设置实例 *******  */
  const modelRef = (ref) => {
    setModelChild(ref);
  };

  const tableRef = (ref) => {
    setTableChild(ref);
  };
  const toolRef = (ref) => {
    setToolChild(ref);
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

  /* 提示弹窗 */
  const handleTool = async (item) => {
    setDefaultData(item);
    if (ToolChild) {
      ToolChild.handleShow();
    }
  };

  /* ******* 设置方法 ******* */
  /* 初始化 */
  const initLoad = async () => {
    dispatch({
      type: 'base/getPkgList',
    });
  };
  /* ******* 监听 ******* */
  useEffect(() => {
    initLoad();
  }, []);
  /* ******* 监听 ******* */

  /* 新增按钮 */
  const addBtn = useCallback(() => <Button style={{ marginBottom: 10 }} type="primary" onClick={() => handleEdit({ id: 0 })}>推广</Button>, [modelChild]);
  /* 表单列表 */
  const SearchTable = useCallback(
    CustomSearchContainer(CustomTabsTable, Search, CustomSearchBtnContainer(), addBtn),
    [addBtn],
  );
  /* 底部按钮 */
  /* 自定义字段 */
  const columns = [
    {
      title: '代理商名称',
      dataIndex: 'cardNo',
      width: 110,
      key: 'cardNo',
    },
    {
      title: '联系电话',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '添加日期',
      dataIndex: 'issueTime',
      key: 'issueTime',
    },
    {
      title: '类型',
      dataIndex: 'userMobile',
      width: 140,
      key: 'userMobile',
    },
    {
      title: '代理信息',
      dataIndex: 'pkgName',
      key: 'pkgName',
    },
    {
      title: '拒绝原因',
      dataIndex: 'pkgName1',
      key: 'pkgName1',
      render: (text, rows) => (
        <Button
          type="link"
          onClick={() => handleTool(rows)}
        >
          详情
        </Button>)

    }
  ];

  return (
    <>
      <SearchTable

        rowKey="id"
        STATUS_LIST={STATUS_LIST}
        request={api.issuer.cardIssueRecord}
        loading
        columns={columns}
        pkgList={pkgList}
        onTableRef={tableRef}
        defaultSearchData={defaultSearchData}
        tabList={[{ title: '审核通过', key: 1 }, { title: '审核中', key: 2 }, { title: '拒绝审核', key: 3 }]}
      />
      <ModalForm
        footer={null}
        onRef={modelRef}
        // visible
        title="推广"
        defaultData={defaultData}
        request={defaultData.id ? api.chnerIssuer.Update : api.chnerIssuer.Create}
        callback={tableChild && tableChild.initData}
        pkgList={pkgList} />
      <ToolForm
        title="拒绝原因"
        onRef={toolRef}
        footer={[<Button type="primary" onClick={() => ToolChild.handleCancle()}>确定</Button>]}
      >
        <h2>批量分发处理中</h2>
        <p>可刷新批量分发页面查看分发状态</p>
      </ToolForm>
    </>
  );
};

export default connect(({ base, loading }) => ({
  pkgList: base.pkgList,
  loading: loading.effects['base/getPkgList'],
}))(Custom);
