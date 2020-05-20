/**
 * @description: 表单高阶
 * @param {type}
 * @return:
 */
import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const CustomModalContainer = (WrappedComponent1) => {
  class Index extends Component {
    static defaultProps = {
      dafaultData: {},
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      title: '数据新增',
      width: 520
    }

    state = {
      visible: false,
      loading: false,
    }

    componentDidMount() {
      this.props.onRef(this);
    }


    handleShow = () => {
      this.setState({
        visible: true
      });
    }

    handleCancle = () => {
      const { form } = this.props;
      this.setState({
        visible: false,
      });
      // form.resetFields();
    }


    hangeClick = (e) => {
      const { onHandle, form } = this.props;
      e.preventDefault();
      if (onHandle) {
        form.validateFields((err, values) => {
          if (!err) {
            this.setState({
              loading: true,
            });
            onHandle(values, () => {
              // form.resetFields();
              this.setState({
                loading: false,
                visible: false,
              });
            }, () => {
              this.setState({
                loading: false,
              });
            });
          }
        });
      }
    }


    render() {
      const { visible, loading } = this.state;
      const { formItemLayout, title, width, form, defaultData } = this.props;
      // const { getFieldDecorator } = form;
      const newProps = {
        custom: {
          visible: this.state.visible,
          handleCancle: this.handleCancle,
          handleShow: this.handleShow
        }
      };
      return (
        <Modal
          visible={visible}
          onCancel={this.handleCancle}
          onOk={this.hangeClick}
          confirmLoading={loading}
          title={title}
          width={width}
        >
          <Form {...formItemLayout} >
            {/* {getFieldDecorator('_id', {
              initialValue: defaultData._id,
            })(
              <Input type="hidden" />,
            )} */}
            <WrappedComponent1 {...this.props} {...newProps} />
          </Form>
        </Modal>
      );
    }
  }
  return Index;
};

export default CustomModalContainer;
