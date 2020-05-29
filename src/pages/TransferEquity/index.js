/*
 * @Author: xgj
 * @since: 2020-05-23 10:40:31
 * @lastTime: 2020-05-29 16:32:06
 * @LastAuthor: xgj
 * @FilePath: /mui-demo/src/pages/TransferEquity/index.js
 * @message:权益划转
 */
import React, { useEffect, useState, useCallback } from 'react';
import CustomTable from '@/components/CustomTable';
import CustomSearchContainer from '@/components/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/CustomSearchBtnContainer';
import { Button } from 'antd';
import api from '@/api';
import { TRANSFER_STATUS_LIST, LEVEL_LIST } from '@/utils/enum';
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
  const addBtn = useCallback(
    () => (
      <Button style={{ marginBottom: 10 }} type="primary" onClick={() => handleEdit({ id: 0 })}>
        权益划转
      </Button>
    ),
    [modelChild],
  );
  /* 表单列表 */
  const SearchTable = useCallback(
    CustomSearchContainer(CustomTable, Search, CustomSearchBtnContainer(), addBtn),
    [addBtn],
  );
  /* 底部按钮 */
  /* 自定义字段 */
  const columns = [
    {
      title: '代理商名称',
      dataIndex: 'toName',
      key: 'toName',
      width: 100
    },
    {
      title: '联系电话',
      dataIndex: 'toContact',
      key: 'toContact',
      width: 124
    },
    {
      title: '权益套餐',
      dataIndex: 'pkgName',
      key: 'pkgName',
    },
    {
      title: '代理信息',
      dataIndex: 'agentAreaList',
      key: 'agentAreaList',
      width: 210,
      render: text => text && text.map(item => <div key={item.agentArea}>{item.agentArea} {LEVEL_LIST[item.agentLevel]}</div>)
    },
    {
      title: '划转时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{TRANSFER_STATUS_LIST[text]}</span>,
    },
    {
      title: '备注',
      ellipsis: true,
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  return (
    <>
      <SearchTable
        rowKey="id"
        // STATUS_LIST={STATUS_LIST}
        request={api.agentCdkey.transferList}
        loading
        columns={columns}
        pkgList={pkgList}
        onTableRef={tableRef}
        defaultSearchData={defaultSearchData}
      />
      <ModalForm
        onRef={modelRef}
        // visible
        title="权益划转"
        defaultData={defaultData}
        request={api.agentCdkey.transferAgent}
        callback={ToolChild && ToolChild.handleShow}
        pkgList={pkgList} />

      <ToolForm
        title="提示"
        onRef={toolRef}
        footer={[<Button type="primary" onClick={() => ToolChild.handleCancle()}>确定</Button>]}
      >
        <h3>权益划转处理中</h3>
        <p>可刷新权益划转页面查看划转状态</p>
      </ToolForm>
    </>
  );
};

export default connect(({ base }) => ({
  pkgList: base.pkgList,
}))(Custom);
