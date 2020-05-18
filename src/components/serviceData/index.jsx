// import styles from './index.less';
import React, { Component } from 'react';
// import http from '@/utils/http';
import { Row, Col, Radio, Select, Table } from 'antd';
import { TitleCard, TipIcon } from '@/components';
import ReactCharts from '../reactCharts/index';
import mock from './mock';

const { Option } = Select;

export default class NewList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    serviceLineOption: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      color: '#3F87FF',
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
          name: '次数',
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

  componentWillMount() {
    this.getServiceCount('today');
  }

  getServiceCount(size) {
    const serviceData = mock[size]; // await http.get('/api/getServiceData/' + size);
    // serviceData = serviceData.data;
    const xdata = [];
    const majorlinedata = [];
    const tellinedata = [];
    const imglinedata = [];
    serviceData.list.forEach(item => {
      xdata.push(item.label);
      majorlinedata.push(item.value);
      tellinedata.push(item.value + parseInt(Math.random() * 70, 10));
      imglinedata.push(item.value + parseInt(Math.random() * 300, 10));
    });
    const { serviceLineOption: opt } = this.state;
    opt.xAxis.data = xdata;
    opt.series[0].data = majorlinedata;
    this.setState({
      askRecord: serviceData.askRecord,
      testRecord: serviceData.testRecord,
      serviceLineOption: opt,
      majorlinedata,
      tellinedata,
      imglinedata,
      lineType: 'major',
    });
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
    this.getServiceCount(e.target.value);
  }

  handleSelectChange = (value) => {
    const { serviceLineOption: opt } = this.state;
    if (value === 'major') {
      opt.series[0].data = this.state.majorlinedata;
    } else if (value === 'tel') {
      opt.series[0].data = this.state.tellinedata;
    } else {
      opt.series[0].data = this.state.imglinedata;
    }
    this.setState({
      lineType: value,
      serviceLineOption: opt,
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: '#fff', borderRadius: '8px' }}>
        <TitleCard title="服务统计">
          <Radio.Group
            value={this.state.size}
            onChange={this.handleSizeChange}
          >
            <Radio.Button value="yesterday">昨天</Radio.Button>
            <Radio.Button value="today">今天</Radio.Button>
            <Radio.Button value="last7day">近7天</Radio.Button>
            <Radio.Button value="last30day">近30天</Radio.Button>
          </Radio.Group>
        </TitleCard>
        <Row gutter={[24, 24]} style={{ padding: 16 }}>
          <Col span={12}>
            <div style={{ fontWeight: 500, marginBottom: 16, fontSize: 16 }}>
              <TipIcon />
              问诊记录
            </div>
            <Table
              columns={[
                {
                  title: '分组',
                  dataIndex: 'group',
                  key: 'group',
                },
                {
                  title: '专科视频',
                  dataIndex: 'major',
                  key: 'major',
                },
                {
                  title: '电话视频',
                  dataIndex: 'tel',
                  key: 'tel',
                },
                {
                  title: '图文问诊',
                  dataIndex: 'img',
                  key: 'img',
                },
              ]}
              dataSource={this.state.askRecord}
              bordered={false}
              pagination={false}
            />
          </Col>
          <Col span={12}>
            <div style={{ fontWeight: 500, marginBottom: 16, fontSize: 16 }}>
              <TipIcon />
              检测记录
            </div>
            <Table
              columns={[
                {
                  title: '分组',
                  dataIndex: 'group',
                  key: 'group',
                },
                {
                  title: '血氧检测',
                  dataIndex: 'blood',
                  key: 'group',
                },
                {
                  title: '电话视频',
                  dataIndex: 'tel',
                  key: 'group',
                },
                {
                  title: '图文问诊',
                  dataIndex: 'img',
                  key: 'group',
                },
              ]}
              dataSource={this.state.testRecord}
              bordered={false}
              pagination={false}
            />
          </Col>
          <Col span={24}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ float: 'left', fontSize: 16, fontWeight: 500 }}>
                <TipIcon />
                问诊次数
              </div>
              <div style={{ float: 'right' }}>
                <Select
                  value={this.state.lineType}
                  style={{ width: 120 }}
                  onChange={this.handleSelectChange}
                >
                  <Option value="major">专科视频</Option>
                  <Option value="tel">电话视频</Option>
                  <Option value="img">图文问诊</Option>
                </Select>
              </div>
            </div>
            <div style={{ height: 350 }}>
              <ReactCharts option={this.state.serviceLineOption} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
