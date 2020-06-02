import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, Form } from 'antd';


const CustomModalContainer = (WrappedComponent1) => {


  const Index = (props, ref) => {
    const { title = '数据新增', width = 520, onRef, footer, children, okButtonProps } = props;
    // console.log(onRef);
    console.log(ref);

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      // onRef(Index);
      onRef(ref);
    }, []);

    const handleShow = () => {
      setVisible(true);
    };

    const handleCancle = () => {
      setVisible(false);
    };

    const hangeClick = () => {

    };

    const newProps = {
      visible,
      handleCancle,
      handleShow,
      form
    };

    return <Modal
      ref={ref}
      visible={visible}
      onCancel={() => handleCancle()}
      onOk={hangeClick}
      confirmLoading={loading}
      title={title}
      width={width}
      footer={footer}
      okButtonProps={okButtonProps}
    >
      <Form name="ModalForm" form={form} >
        {children}
        <WrappedComponent1 {...props} {...newProps} />
      </Form>
    </Modal>;
  };

  return (Index);
};

export default CustomModalContainer;
