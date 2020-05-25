/*
 * @Author: xgj
 * @since: 2020-05-19 10:50:01
 * @lastTime: 2020-05-23 10:42:59
 * @LastAuthor: xgj
 * @FilePath: /mui-demo/src/pages/cardSenderDetail/index.jsx
 * @message:代理人详情
 */
import React from 'react';
import { history } from 'umi';
import { TitleCard } from '@/components';
import api from '@/api';
import SendRecord from '../sendRecord/index';
import DetailCard from './Components/DetailCard';
import styles from './index.less';

const backicon = require('@/assets/img/common/icon_back_blue.png');

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    sendData: {},
  };

  componentDidMount() {
    api.issuer.distributionStatistics({
      issuerId: history.location.query.id
    }).then(res => {
      this.setState({ sendData: res });
    });
  }


  render() {
    return (
      <div>
        <div onClick={() => history.goBack()} className={styles.backicon}>
          <img alt="" src={backicon} style={{ width: 12, height: 12 }} />
          <span>返回</span>
        </div>
        <DetailCard sendData={this.state.sendData} history={history} />
        <div className={styles.box}>
          <TitleCard title="分发列表" />
          <SendRecord defaultSearchData={{ issuerId: history.location.query.id }} id={history.location.query.id} />
        </div>
      </div >
    );
  }
}
