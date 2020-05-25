/**
 * @description: 表单高阶
 * @param {type}
 * @return:
 */
import React, { Component } from 'react';
import { Modal, Form } from 'antd';

const CustomModalContainer = (WrappedComponent1) => {
  class Index extends Component {
    static defaultProps = {
      defaultData: {},
      formItemLayout: {
        labelCol: { span: 4 },
        // wrapperCol: { span: 20 },
      },
      title: '数据新增',
      width: 520,
    };

    constructor(props) {
      super(props);
    }

    state = {
      visible: this.props.visible || false,
      loading: false,
    };

    componentDidMount() {
      this.props.onRef(this);
    }

    handleShow = () => {
      this.setState({
        visible: true,
      });
    };

    handleCancle = () => {
      this.setState({
        visible: false,
      });
    };

    hangeClick = async () => {
      const { request, callback, isClearn = true } = this.props;
      // const isTouch = await this.refs.ModalForm.isFieldsTouched([], true);
      // console.log(isTouch);

      const values = await this.refs.ModalForm.validateFields();
      this.setState({
        loading: true,
      });
      if (request) {
        const r = await request(values);
        this.setState({
          loading: false,
          visible: !r,
        });
        if (r) {
          isClearn && this.resetFields();
          callback && callback();
        }
      } else {
        this.setState({
          loading: false,
          visible: false,
        });
      }

      // this.refs.ModalForm.validateFields().then(async (values) => {
      //   console.log(values);

      //   this.setState({
      //     loading: true,
      //   });
      //   if (request) {
      //     const r = await request(values);
      //     this.setState({
      //       loading: false,
      //       visible: !r,
      //     });
      //     if (r) {
      //       this.resetFields();
      //       callback && callback();
      //     }
      //   }
      // });
    };

    setFieldsValue = (defaultData) => {
      this.refs.ModalForm.setFieldsValue(defaultData);
    };

    resetFields = () => {
      this.refs.ModalForm.resetFields();
    };

    render() {
      const { visible, loading } = this.state;
      const { formItemLayout, title, width, footer } = this.props;
      const newProps = {
        visible: this.state.visible,
        handleCancle: this.handleCancle,
        handleShow: this.handleShow,
        setFieldsValue: this.setFieldsValue,
        resetFields: this.resetFields,
      };
      return (
        <Modal
          visible={visible}
          onCancel={this.handleCancle}
          onOk={this.hangeClick}
          confirmLoading={loading}
          title={title}
          width={width}
          footer={footer}
        >
          <Form name="ModalForm" ref="ModalForm" {...formItemLayout}>
            {this.props.children}
            <WrappedComponent1 {...this.props} {...newProps} />
          </Form>
        </Modal>
      );
    }
  }

  return Index;
};

export default CustomModalContainer;
