import styles from './index.less';
import React, { Component } from 'react';
import ReactCharts from '../reactCharts/index';
import { Row, Col } from 'antd';
import { TitleCard, TipIcon } from '@/components';

export default class UserPanalData extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    serviceLineOption: {
      tooltip: {
        show: true,
        trigger: 'item',
      },
      legend: {
        show: true,
        bottom: 120,
        right: 0,
        width: 20,
        icon: 'circle',
      },
      color: ['#3F87FF', '#FF8F8F'],
      series: [
        {
          type: 'pie',
          radius: '75%',
          data: [
            { name: '男', value: 320 },
            { name: '女', value: 520 },
          ],
          animation: false,
          legend: {
            show: true,
          },
          label: {
            show: false,
          },
        },
      ],
    },
    serviceLineOption2: {
      tooltip: {
        show: true,
        trigger: 'item',
      },
      legend: {
        show: true,
        bottom: 80,
        right: 0,
        width: 150,
        icon: 'circle',
      },
      color: [
        '#3F87FF',
        '#3CD3F8',
        '#9EE6B7',
        '#FFDB5C',
        '#FF9F7F',
        '#FB7293',
        '#E7BCF3',
        '#8378EA',
      ],
      series: [
        {
          type: 'pie',
          radius: '75%',
          data: [
            { name: '浙江省', value: 156 },
            { name: '上海市', value: 104 },
            { name: '江苏省', value: 134 },
            { name: '河南省', value: 120 },
            { name: '湖北省', value: 79 },
            { name: '江西省', value: 164 },
            { name: '河北省', value: 64 },
            { name: '安徽省', value: 128 },
          ],
          animation: false,
          legend: {
            show: true,
          },
          label: {
            show: false,
          },
        },
      ],
    },
    lineType: 'major',
    size: 'today',
    askRecord: [],
    testRecord: [],
    majorlinedata: [],
    tellinedata: [],
    imglinedata: [],
  };
  componentWillMount() {}
  render() {
    return (
      <div style={{ backgroundColor: '#fff', borderRadius: '8px' }}>
        <TitleCard title="用户分布"></TitleCard>
        <Row gutter={[24, 24]} style={{ padding: 16 }}>
          <Col span={12}>
            <div
              style={{
                fontWeight: 500,
                marginBottom: 16,
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              <TipIcon></TipIcon>
              性别分布
            </div>
            <div style={{ height: 250, width: 300, margin: '0 auto' }}>
              <ReactCharts option={this.state.serviceLineOption}></ReactCharts>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                fontWeight: 500,
                marginBottom: 16,
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              <TipIcon></TipIcon>
              地域分布
            </div>
            <div style={{ height: 250, width: 500, margin: '0 auto' }}>
              <ReactCharts option={this.state.serviceLineOption2}></ReactCharts>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
