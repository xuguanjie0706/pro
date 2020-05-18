import React, { Component } from 'react';
import { Row, Col } from 'antd';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    form: {},
  };
  componentWillMount() {}
  onFinish(e) {
    this.props.onFinish(e);
  }
  render() {
    let { style } = this.props;
    return (
      <div
        style={{
          backgroundColor: this.props.backgroundColor || '#F4F4F4',
          padding: '16px',
          paddingBottom: 8,
          marginBottom: 16,
          ...style,
        }}
      >
        <Row gutter={[24, 16]}>
          {this.props.children &&
            this.props.children.map((item, key) => {
              return (
                item && (
                  <Col span={item.props.span || 6} key={key}>
                    <span
                      style={{
                        color: '#333333',
                        width: this.props.labelWidth || 'auto',
                        display: 'inline-block',
                        textAlign: 'end',
                      }}
                    >
                      {item.props.label}
                    </span>
                    <div
                      style={{
                        width: this.props.labelWidth
                          ? 'calc(100% - ' + this.props.labelWidth + 'px)'
                          : '',
                        display: 'inline-block',
                      }}
                    >
                      {item.props.children || item}
                    </div>
                  </Col>
                )
              );
            })}
        </Row>
      </div>
    );
  }
}
