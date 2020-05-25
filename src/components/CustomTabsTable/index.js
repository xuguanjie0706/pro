import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const CustomTabsTable = (props) => {
  const { tabList } = props;
  console.log(tabList);

  const [status, setStatus] = useState(1);
  function callback(key) {
    setStatus(key);
  }

  // const Index = (TableComponents) => {
  return (
    <Tabs type="card" defaultActiveKey={status} onChange={callback}>
      {tabList.map(item => <TabPane tab={item.title} key={item.key}>
        <CustomTable {...props} />
      </TabPane>)
      }
    </Tabs>
  );
  // };
  // return Index;
};

export default CustomTabsTable;
