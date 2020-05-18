import { Modal, Button } from 'antd';

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
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
          onCancel={this.handleCancel.bind(this)}
          footer={
            this.props.footer && this.props.footer.length
              ? this.props.footer
              : [
                  <Button key="back" onClick={this.handleCancel.bind(this)}>
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
