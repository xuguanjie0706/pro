import React from 'react';
import { Button, Modal } from 'antd';

// const { confirm } = Modal;

const CustomSearchBtnContainer = WrappedComponent1 => {
  const Index = props => {
    const { form, handleEdit, table, handleDelete, isAdd = true } = props;
    // const { resetFields } = form;
    // const Delete = () => {
    //   confirm({
    //     title: "确定要删除吗?",
    //     async onOk() {
    //       await handleDelete({ ids: table.state.selectedKey });
    //       table.cleanSelectedKey();
    //     },
    //     onCancel() {}
    //   });
    // };
    return (
      <div
        style={{
          display: 'flex',
          // flexDirection: 'row-reverse',
          marginLeft: 'auto'
        }}
      >
        <Button type="primary" style={{ marginRight: 10 }} htmlType="submit">
          筛选
        </Button>
        {/* <Button
          style={{ marginRight: 10 }}
          type="dashed"
        onClick={() => resetFields()}
        >
          重置
        </Button> */}
        {/* {isAdd && (
          <Button
            style={{ marginRight: 10 }}
            type="primary"
          // onClick={() => handleEdit({ _id: null })}
          >
            新增
          </Button>
        )} */}
        {handleDelete && (
          <Button
            style={{ marginRight: 10 }}
            type="danger"
          // onClick={() => Delete()}
          >
            批量删除
          </Button>
        )}

        {WrappedComponent1 && <WrappedComponent1 {...props} />}
      </div>
    );
  };

  return Index;
};

export default CustomSearchBtnContainer;
