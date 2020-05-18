import React, { Component } from 'react';
import { Table } from 'antd';


import { TitleCard } from '@/components';
import api from '@/api';
import styles from './index.less';

export default class NewList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    suitData: [],
    suitColumns: [
      {
        title: '权益套餐',
        dataIndex: 'pkgName',
        key: 'pkgName',
        render: (val, row) => {
          const obj = {
            children: val,
            key: row.id,
            props: {
              rowSpan: 0,
              key: row.id,
            },
          };
          if (row.num) {
            obj.props.rowSpan = row.num;
          }
          return obj;
        },
      },
      {
        title: '所含权益',
        dataIndex: 'prdName',
        key: 'id',
      },
      {
        title: '权益说明',
        dataIndex: 'prdDesc',
        key: 'id',
      },
    ],
  };


  async componentWillMount() {
    const { type } = this.props;
    this.initData(type);
  }

  initData = async (type) => {
    const extracol = [
      {
        title: '有效期/天',
        dataIndex: 'validDays',
        key: 'id',
      },
      {
        title: '次数',
        dataIndex: 'times',
        key: 'id',
      },
      {
        title: '数量',
        dataIndex: 'stock',
        key: 'id',
        render: (text, row) => {
          const obj = {
            children: (
              <span key={row.id}>
                <span style={{ color: '#1464E8' }}>{text}</span>/{row.total}
              </span>
            ),
            key: row.id,
            props: {
              rowSpan: 0,
              key: row.id,
            },
          };
          if (row.num) {
            obj.props.rowSpan = row.num;
          }
          return obj;
        },
      },
    ];

    if (type === 'overview') {
      const { suitColumns } = this.state;
      this.state.suitColumns.push(...extracol);
      await this.setState({ suitColumns });
      api.dataOverview.rightsStatistics().then(r => {
        this.parsedata(r);
      });
    } else {
      const { id } = this.props;
      api.issuer.rightsStatistics({
        data: {
          issuerId: id
        }
      }).then(r => {
        this.parsedata(r);
      });
    }

  }

  parsedata(data) {
    const list = [];
    data.forEach(item => {
      item.rightsDetails.forEach((right, index) => {
        list.push({
          ...right,
          num: index === 0 && item.rightsDetails.length,
          pkgName: item.pkgName,
          stock: item.stock,
          total: item.total,
        });
      });
    });
    this.setState({ suitData: list });
  }

  render() {
    return (
      <div className={styles.block}>
        {this.props.title !== false && <TitleCard title="权益套餐" />}
        <div className={styles.pd16}>
          <Table
            className={styles.table}
            style={{ borderRadius: '8px' }}
            columns={this.state.suitColumns}
            dataSource={this.state.suitData}
            rowKey="id"
            bordered
            pagination={false}
          />
        </div>
      </div>
    );
  }
}
