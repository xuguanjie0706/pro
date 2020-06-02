/*
 * @Author: xgj
 * @since: 2020-05-23 09:27:06
 * @lastTime: 2020-06-02 11:40:09
 * @LastAuthor: xgj
 * @FilePath: /mui-demo/src/pages/extensionView/index.js
 * @message:推广
 */
import React, { useEffect, useCallback, useState } from 'react';
// import CustomTable from '@/components/CustomTable';
import CustomTabsTable from '@/components/CustomTabsTable';
import CustomSearchContainer from '@/components/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/CustomSearchBtnContainer';
import { Button } from 'antd';
import api from '@/api';
import { LEVEL_LIST } from '@/utils/enum';
import { connect } from 'umi';
import { getBaseUrl } from '@/utils/utils';
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
  const handleEdit = async () => {
    const code = await api.user.getInviteUrl({ inviteBaseUrl: `${getBaseUrl()}applyingAgency/` });
    // console.log({ code });
    setDefaultData({ code });
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
    // dispatch({
    //   type: 'base/getPkgList',
    // });
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '联系电话',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '添加日期',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '类型',
      dataIndex: 'agentType',
      key: 'agentType',
    },
    {
      title: '代理信息',
      dataIndex: 'agentApplyAreaList',
      key: 'agentApplyAreaList',
      render: text => text && text.map((item, index) => <div key={(item.agentLevel + index).toString()}>{item.agentArea}{LEVEL_LIST[item.agentLevel]}</div>)
    },
    {
      title: '拒绝原因',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
      render: (text, rows) => (
        < Button
          type="link"
          onClick={() => handleTool(rows)}
        >
          查看
        </Button >)

    }
  ];

  return (
    <>
      <SearchTable
        rowKey="id"
        LEVEL_LIST={LEVEL_LIST}
        request={api.agent.applyList}
        loading
        columns={columns}
        // pkgList={pkgList}
        tableChild={tableChild}
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
      // pkgList={pkgList}
      />
      <ToolForm
        title="拒绝原因"
        onRef={toolRef}
        footer={[<Button type="primary" onClick={() => ToolChild.handleCancle()}>确定</Button>]}
      >
        <p style={{ textAlign: 'center', marginBottom: 0, lineHeight: '32px' }}>{defaultData.statusDesc}</p>
      </ToolForm>
    </>
  );
};

export default connect(({ base, loading }) => ({
  pkgList: base.pkgList,
  loading: loading.effects['base/getPkgList'],
}))(Custom);
