import React, { forwardRef, useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const CustomModalContainer = (WrappedComponent1) => {
  const Index = forwardRef((props, ref) => {
    console.log(props);
    const formItemLayout = {
      labelCol: { span: 4 },
      // wrapperCol: { span: 20 },
    };
    const { title = '数据新增', width = 520, request, onRef } = props;

    console.log(onRef);

    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
      onRef(Index);
    }, []);

    const handleShow = () => {
      setVisible(true);
    };
    const handleCancle = () => {
      setVisible(false);
    };
    const hangeClick = (e) => {
      e.preventDefault();
      handleShow(true);
    };
    const newProps = {
      visible,
      handleCancle,
      handleShow,
      form
    };

    return (
      <Modal
        // ref={ref}
        visible={visible}
        onCancel={handleCancle}
        onOk={hangeClick}
        confirmLoading={loading}
        title={title}
        width={width}
      >
        <Form name="ModalForm" form={form} {...formItemLayout} >
          <WrappedComponent1 {...props} {...newProps} />
        </Form>
      </Modal>
    );
  });
  return Index;
};

export default CustomModalContainer;
