import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
  CardReceiveData,
  TitleCard,
  RightSuit,
} from '@/components';

import api from '@/api';

import styles from './index.css';

export default class dataView extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    users: {},
  };

  componentDidMount() {
    api.dataOverview.userStatistics().then(r => {
      this.setState({ users: r });
    });
    // http.post('/data_overview/user_statistics').then((res) => {
    //   this.setState({ users: res.data });
    // });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <Row gutter={[12, 16]}>
          <Col span={24}>
            <Row gutter={[12, 16]}>
              <Col span={24}>
                <RightSuit type="overview" />
              </Col>
              <Col span={24}>
                <div className={styles.block}>
                  <TitleCard title="用户统计" />
                  <Row className={styles.pd16} gutter={[32, 0]}>
                    <Col span={6} style={{ borderRight: '1px solid #EEEEEE' }}>
                      今日新增用户
                      <br />
                      <div className={styles.bigNum}>{users.today}</div>
                    </Col>
                    <Col span={6} style={{ borderRight: '1px solid #EEEEEE' }}>
                      近七日新增
                      <br />
                      <div className={styles.bigNum}>{users.lastWeek}</div>
                    </Col>
                    <Col span={6} style={{ borderRight: '1px solid #EEEEEE' }}>
                      近30天新增
                      <br />
                      <div className={styles.bigNum}>{users.lastMonth}</div>
                    </Col>
                    <Col span={6}>
                      累计用户
                      <br />
                      <div className={styles.bigNum}>{users.total}</div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={24}>
                <CardReceiveData className={styles.block} />
              </Col>
              {/* <Col span={24}>
                <UserPanalData className={styles.block}></UserPanalData>
              </Col> */}
            </Row>
          </Col>
          {/* <Col span={6}>
            <NewList className={styles.block}></NewList>
          </Col> */}
        </Row>
      </div>
    );
  }
}
