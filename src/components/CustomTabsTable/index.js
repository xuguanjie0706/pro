import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const CustomTabsTable = (props) => {
  const { tabList, tableChild, form } = props;
  const [status, setStatus] = useState(1);
  const callback = async (key) => {
    await setStatus(key);
    tableChild && tableChild.initData(form.getFieldsValue());
  };

  // const Index = (TableComponents) => {
  return (
    <>
      <Tabs type="card" defaultActiveKey={status} onChange={callback}>
        {tabList.map(item => <TabPane tab={item.title} key={item.key} />)
        }
      </Tabs>
      <CustomTable {...props} defaultSearchData={{ status }} />

    </>
  );
  // };
  // return Index;
};

export default CustomTabsTable;
