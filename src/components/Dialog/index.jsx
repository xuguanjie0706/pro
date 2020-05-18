import { Modal, Button } from 'antd';
import React, { Component } from 'react';


export default class Dialog extends Component {
  constructor(props) {
    super(props);
  }

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div>
        <Modal
          {...this.props}
          title={this.props.title}
          maskClosable={this.props.maskClosable || false}
          visible={this.props.visible}
          closable={this.props.closable}
          style={{ minHeight: 240, ...this.props.style }}
          onCancel={this.handleCancel}
          footer={
            this.props.footer && this.props.footer.length
              ? this.props.footer
              : [
                <Button key="back" onClick={this.handleCancel}>
                  关闭
                  </Button>,
              ]
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              minHeight: 94,
              alignItems: 'center',
            }}
          >
            {this.props.children}
          </div>
        </Modal>
      </div>
    );
  }
}
