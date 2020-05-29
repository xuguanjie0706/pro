/**
 * @description: 表单高阶
 * @param {type}
 * @return:
 */
import React, { Component } from 'react';
import { Modal } from 'antd';

class CustomModal extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    visible: this.props.visible || false,
    loading: false,
    // disable: false
  };

  // componentDidMount() {
  //   this.props.onRef(this);
  // }

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


  render() {
    const { visible, loading } = this.state;
    const { title, width, footer, okButtonProps, children } = this.props;
    return (
      <Modal
        visible={visible}
        onCancel={this.handleCancle}
        onOk={this.hangeClick}
        confirmLoading={loading}
        title={title}
        width={width}
        footer={footer}
        okButtonProps={okButtonProps}
      >
        {...children}
      </Modal>
    );
  }
}

export default CustomModal;
