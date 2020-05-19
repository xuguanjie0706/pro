import React from 'react';
import { Button, Row, Col } from 'antd';
import { history } from 'umi';
import { Dialog, TitleCard, RightSuit } from '@/components';
import api from '@/api';
import SendRecord from '../sendRecord/index';
import styles from './index.less';

const backicon = require('@/assets/img/common/icon_back_blue.png');

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    dialogVisiable: false,
    receieveDate: '',
    receieveDateType: '',
    EndDate: '',
    EndDateType: '',
    nickName: '',
    phone: '',
    groupId: '',
    sendData: {},
  };

  componentDidMount() {
    api.issuer.distributionStatistics({
      issuerId: history.location.query.id
    }).then(res => {
      this.setState({ sendData: res });
    });
  }


  onReceieveChange = (date, dateString) => {
    this.setState({
      receieveDate: dateString,
    });
  }

  onEndChange = (date, dateString) => {
    this.setState({
      EndDate: dateString,
    });
  }


  closeModal = () => {
    this.setState({ dialogVisiable: false });
  }

  openDialog() {
    this.setState({ dialogVisiable: true });
  }


  render() {
    return (
      <div>
        <div onClick={() => history.goBack()} className={styles.backicon}>
          <img alt="" src={backicon} style={{ width: 12, height: 12 }} />
          <span>返回</span>
        </div>
        <div className={styles.box}>
          <div className={styles.boxContainer}>
            <div className={styles.sendername}>
              {history.location.query.name}
            </div>
            <div className={styles.senderdate}>
              加入时间：{history.location.query.createat}
            </div>
          </div>
          <div className={styles.boxContainer}>
            <Row gutter={[16, 0]}>
              <Col span={8}>
                <div className={styles.databox}>
                  <div className={styles.title}>今日分发</div>
                  <div className={styles.bignum}>
                    {this.state.sendData.issuingToday}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.databox}>
                  <div className={styles.title}>累计分发</div>
                  <div className={styles.bignum}>
                    {this.state.sendData.issuingTotal}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.databox}>
                  <div className={styles.title}>未领取</div>
                  <div className={styles.bignum}>
                    {this.state.sendData.unaccalimed}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <RightSuit id={history.location.query.id} title={false} />
        </div>
        <div className={styles.box}>
          <TitleCard title="分发列表" />
          <SendRecord id={history.location.query.id} />
        </div>

        <Dialog
          visible={this.state.dialogVisiable}
          onClose={this.closeModal}
          title="弹窗测试"
          footer={[
            <Button type="default" onClick={this.closeModal}>
              取消
            </Button>,
            <Button type="primary" onClick={this.closeModal}>
              确认
            </Button>,
          ]}
        >
          adhafhajkdfhnkjafbaf
        </Dialog>
      </div >
    );
  }
}
