import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import api from '@/api';
import { queryRule, updateRule, addRule, removeRule } from './service';

const Custom = () => {
  const actionRef = useRef();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      // hideInForm: true,
      renderText: (val) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              // setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];
  // api.user.query()

  return (
    <PageHeaderWrapper title="fa">
      <ProTable
        headerTitle="测试专用"
        // search={false}
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          // selectedRows && selectedRows.length > 0 && (
          //   <Dropdown
          //     overlay={
          //       <Menu
          //         onClick={async e => {
          //           if (e.key === 'remove') {
          //             await handleRemove(selectedRows);
          //             action.reload();
          //           }
          //         }}
          //         selectedKeys={[]}
          //       >
          //         <Menu.Item key="remove">批量删除</Menu.Item>
          //         <Menu.Item key="approval">批量审批</Menu.Item>
          //       </Menu>
          //     }
          //   >
          //     <Button>
          //       批量操作 <DownOutlined />
          //     </Button>
          //   </Dropdown>
          // ),
        ]}
        // request={params => queryRule(params)}
        columns={columns}
        // rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default Custom;
