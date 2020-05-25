/*
 * @Author: xgj
 * @since: 2020-05-23 09:11:54
 * @lastTime: 2020-05-23 10:43:22
 * @LastAuthor: xgj
 * @FilePath: /mui-demo/src/pages/agentPeople/index.js
 * @message:代理商
 */
import React, { useEffect, useCallback } from 'react';
import CustomTable from '@/components/CustomTable';
import CustomSearchContainer from '@/components/CustomSearchContainer';
import CustomSearchBtnContainer from '@/components/CustomSearchBtnContainer';
import { Avatar } from 'antd';
import api from '@/api';
import { STATUS_LIST } from '@/utils/enum';
import { connect } from 'umi';
import Search from './Search';
// import ModalForm from './Form';

const Custom = (props) => {
  const { pkgList, dispatch, defaultSearchData } = props;

  /* ******* 设置属性 *******  */
  // const [modelChild, setModelChild] = useState(null); // 新增弹窗
  // const [tableChild, setTableChild] = useState(null); // 列表弹窗
  // const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值

  /* ******* 设置属性 *******  */

  /* ******* 设置实例 *******  */
  // const modelRef = (ref) => {
  //   setModelChild(ref);
  // };

  // const tableRef = (ref) => {
  //   setTableChild(ref);
  // };

  /* ******* 设置实例 ******* */

  /* ******* 设置方法 ******* */

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
      type: 'base/getPkgList',
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
      title: '代理商名称',
      dataIndex: 'cardNo',
      key: 'cardNo',
    },
    {
      title: '联系电话',
      dataIndex: 'nickName',
      key: 'nickName',
      render: (text, item) => (
        <div title={text}>
          <Avatar key={item.cardNo} src={item.userAvatar} size={24} style={{ marginRight: 8 }} />
          <span key={text}>{filtername(text)}</span>
        </div>
      ),
    },
    {
      title: '添加日期',
      dataIndex: 'issueTime',
      key: 'issueTime',
    },
    {
      title: '类型',
      dataIndex: 'userMobile',
      key: 'userMobile',
    },
    {
      title: '代理信息',
      dataIndex: 'pkgName',
      key: 'pkgName',
    },
    {
      title: '权益套餐',
      dataIndex: 'issuerName',
      key: 'issuerName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{STATUS_LIST[text]}</span>,
    },
    {
      title: '下级代理商数',
      ellipsis: true,
      dataIndex: 'remark',
      key: 'remark',
    },
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
        // onTableRef={tableRef}
        defaultSearchData={defaultSearchData}
      />
      {/* <ModalForm
      onRef={modelRef}
      defaultData={defaultData}
      request={defaultData.id ? api.chnerIssuer.Update : api.chnerIssuer.Create}
      callback={tableChild && tableChild.initData}
      pkgList={pkgList} /> */}
    </>
  );
};

export default connect(({ base, loading }) => ({
  pkgList: base.pkgList,
  loading: loading.effects['base/getPkgList'],
}))(Custom);
