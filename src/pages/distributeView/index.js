/*
 * @Author: xgj
 * @since: 2020-05-23 09:27:41
 * @lastTime: 2020-05-29 18:22:13
 * @LastAuthor: xgj
 * @FilePath: /mui-demo/src/pages/distributeView/index.js
 * @message:批量分发
 */
import React, { useEffect, useState, useCallback } from 'react';
import CustomTable from '@/components/CustomTable';
import CustomSearchContainer from '@/components/CustomSearchContainer';
import { Button } from 'antd';
import api from '@/api';
import { BATCH_TYPE_LIST } from '@/utils/enum';
import { connect } from 'umi';
import ModalForm from './Form';
import ToolForm from './ToolForm';
import ErrorForm from './ErrorForm';

const Custom = (props) => {
  const { pkgList, dispatch, defaultSearchData } = props;

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [ToolChild, setToolChild] = useState(null); // 列表弹窗
  const [ErrorChild, setErrorChild] = useState(null); // 列表弹窗
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
  const errorRef = (ref) => {
    setErrorChild(ref);
  };

  /* ******* 设置实例 ******* */

  /* ******* 设置方法 ******* */
  const handleEdit = async (item) => {
    // console.log(item);
    // ErrorChild.handleShow();
    // ToolChild.handleShow();
    setDefaultData(item);
    if (modelChild) {
      modelChild.handleShow();
    }
  };

  const handleError = async (item) => {
    console.log(item);

    setDefaultData(item);
    if (ErrorChild) {
      ErrorChild.handleShow();
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
  const addBtn = useCallback(() => <Button style={{ marginBottom: 10 }} type="primary" onClick={() => handleEdit({ id: 0 })}>批量分发</Button>, [modelChild]);
  /* 表单列表 */
  const SearchTable = useCallback(
    CustomSearchContainer(CustomTable, null, null, addBtn),
    [addBtn],
  );
  /* 底部按钮 */

  /* 自定义字段 */
  const columns = [
    {
      title: '权益套餐',
      dataIndex: 'pkgName',
      key: 'pkgName',
    },
    {
      title: '分发时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '分发数量',
      dataIndex: 'targetCnt',
      key: 'targetCnt',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '失败记录',
      dataIndex: 'detailList',
      key: 'detailList',
      render: text => {
        return text ? <span className="span-primit " onClick={() => handleError(text)}>查看</span> : '-';
      }
    },
    {
      title: '分发记录',
      dataIndex: 'filePath',
      key: 'filePath',
      render: text => <a href={text} target="_block">下载</a>
    },
  ];

  return (
    <>
      <SearchTable
        rowKey="id"
        BATCH_TYPE_LIST={BATCH_TYPE_LIST}
        request={api.cardBinding.batchList}
        loading
        columns={columns}
        pkgList={pkgList}
        onTableRef={tableRef}
        defaultSearchData={defaultSearchData}
      />
      <ModalForm
        width={560}
        // okButtonProps={{ disabled: true }}
        title="批量权益分发"
        formItemLayout={{ labelCol: { span: 6 }, }}
        onRef={modelRef}
        // visible
        defaultData={defaultData}
        request={api.cardBinding.batchImport}
        callback={() => { ToolChild && ToolChild.handleShow(); tableChild && tableChild.initData(); }}
        pkgList={pkgList}
        BATCH_TYPE_LIST={BATCH_TYPE_LIST} />
      <ToolForm
        title="提示"
        onRef={toolRef}
        footer={[<Button type="primary" onClick={() => ToolChild.handleCancle()}>确定</Button>]}
      >
        <div className="hl-flex-center">
          <h2>批量分发处理中</h2>
          <p>可刷新批量分发页面查看分发状态</p>
        </div>

      </ToolForm>

      <ErrorForm
        width={550}
        defaultData={defaultData}
        title="批量分发完成"
        // visible
        onRef={errorRef}
      />
    </>
  );
};

export default connect(({ base, loading }) => ({
  pkgList: base.pkgList,
  loading: loading.effects['base/getPkgList'],
}))(Custom);
