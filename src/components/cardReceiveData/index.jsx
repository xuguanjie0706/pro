/*
 * @Author: xgj
 * @since: 2020-05-18 18:57:45
 * @lastTime: 2020-05-22 14:04:44
 * @LastAuthor: xgj
 * @FilePath: /mui-demo/src/components/cardReceiveData/index.jsx
 * @message:首页组件
 */
import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';
import { TitleCard, TipIcon } from '@/components';
import api from '@/api';
import ReactCharts from '../reactCharts';
import styles from './index.less';

export default class CardReceiveData extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    serviceLineOption: {
      xAxis: {
        type: 'category',
        data: [],
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      color: '#3F87FF',
      yAxis: {
        type: 'value',
        minInterval: 1,
      },
      series: [
        {
          data: [],
          type: 'line',
          name: '领卡数',
          smooth: true,
        },
      ],
    },
    issuingToday: 50,
    peopleTotal: 15,
    receivedToday: 200,
    receivedTotal: 500,
    size: '1',
  };


  componentDidMount() {
    this.getCardData('1');
    api.dataOverview.cardData().then(r => {
      this.setState({ ...r });
    });
  }

  async getCardData(size) {
    const serviceData = await api.dataOverview.cardTrends({
      type: Number(size),
    });
    const xdata = [];
    const lineData = [];
    serviceData.sort((a, b) => a.period - b.period);
    serviceData.forEach(item => {
      const it = { ...item };
      if (size === '1') {
        if (it.period < 10) {
          it.period = `0${it.period}:00`;
        } else {
          it.period += ':00';
        }
      }
      xdata.push(it.period);
      lineData.push(it.cnt);
    });
    const { serviceLineOption: opt } = this.state;
    opt.xAxis.data = xdata;
    opt.series[0].data = lineData;
    this.setState({
      serviceLineOption: opt,
    });
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
    this.getCardData(e.target.value);
  }

  render() {
    return (
      <div style={{ backgroundColor: '#fff', borderRadius: '8px' }}>
        <TitleCard title="领卡数据" />
        <div style={{ padding: 16 }}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Row gutter={[12, 12]}>
                <Col span={6}>
                  <div style={{ borderRight: '1px solid #EEEEEE' }}>
                    今日发卡
                    <br />
                    <div className={styles.bigNum}>
                      {this.state.issuingToday}
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{ borderRight: '1px solid #EEEEEE' }}>
                    今日领取
                    <br />
                    <div className={styles.bigNum}>
                      {this.state.receivedToday}
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{ borderRight: '1px solid #EEEEEE' }}>
                    累计领卡人次
                    <br />
                    <div className={styles.bigNum}>
                      {this.state.peopleTotal}
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    累计领卡数
                    <br />
                    <div className={styles.bigNum}>
                      {this.state.receivedTotal}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <div>
                <TipIcon />
                领卡趋势
                <Radio.Group
                  style={{ float: 'right' }}
                  value={this.state.size}
                  onChange={this.handleSizeChange}
                >
                  <Radio.Button value="1">今天</Radio.Button>
                  <Radio.Button value="2">近7天</Radio.Button>
                  <Radio.Button value="3">近30天</Radio.Button>
                </Radio.Group>
              </div>
              <div style={{ height: 350 }}>
                <ReactCharts
                  option={this.state.serviceLineOption}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
