import React, { useState, useEffect } from 'react';
import CustomTable from '@/components/CustomTable';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const CustomTabsTable = (props) => {

  const { tabList, tableChild, form, columns } = props;
  const [status, setStatus] = useState(1);
  const [trueColumns, setColumns] = useState(columns);

  useEffect(() => {
    const list = columns.slice(0, -1);
    setColumns(list);
  }, []);

  const callback = async (key) => {
    await setStatus(key);
    tableChild && tableChild.initData(form.getFieldsValue());
    if (key !== '3') {
      const list = columns.slice(0, -1);
      setColumns(list);
    } else {
      setTimeout(() => {
        setColumns(columns);
      }, 100);

    }
  };

  // const Index = (TableComponents) => {
  return (
    <>
      <Tabs type="card" defaultActiveKey={status} onChange={callback}>
        {tabList.map(item => <TabPane tab={item.title} key={item.key} />)
        }
      </Tabs>
      <CustomTable {...props} rowKey="id" columns={trueColumns} defaultSearchData={{ status }} />

    </>
  );
  // };
  // return Index;
};

export default CustomTabsTable;
