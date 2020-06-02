/*
 * @Author: xgj
 * @since: 2020-05-18 18:57:45
 * @lastTime: 2020-06-01 15:37:48
 * @LastAuthor: xgj
 * @FilePath: /mui-demo/src/components/rightSuit/index.jsx
 * @message:  首页组件
 */
import React, { Component } from 'react';
import { Table, Modal, Form, Input, message } from 'antd';

import { connect } from 'umi';
import { TitleCard } from '@/components';
import api from '@/api';
import styles from './index.less';

@connect(({ login }) => ({ role: login.role }))
export default class NewList extends Component {
  // 储存input
  InputEl = null;

  constructor(props) {
    super(props);
  }

  state = {
    suitData: [],
    suitColumns: [
      {
        title: '权益套餐',
        dataIndex: 'pkgName',
        key: 'pkgNam',
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
        key: 'prdName',
      },
      {
        title: '权益说明',
        dataIndex: 'prdDesc',
        key: 'prdDesc',
      },
    ],
    showExportModal: false,
    currentRow: null,
  };


  async componentWillMount() {
    const { type } = this.props;
    this.initData(type);
  }


  initData = async (type) => {
    const { role } = this.props;
    console.log(role);

    const extracol = [
      {
        title: '有效期',
        dataIndex: 'cardExpiryDesc',
        key: 'cardExpiryDesc',
      },
      {
        title: '次数',
        dataIndex: 'times',
        key: 'times',
      },
      {
        title: '数量',
        dataIndex: 'stock',
        key: 'num1',
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

    const CustomColumn = {
      title: '',
      key: 'operation',
      render: (text, row) => {
        const obj = {
          children: <a onClick={() => this.exportShow(row)}>导出</a>,
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
    };
    if (role === '1') {
      extracol.push(CustomColumn);
    }

    if (type === 'overview') {
      const { suitColumns } = this.state;
      this.state.suitColumns.push(...extracol);
      await this.setState({ suitColumns });
      api.dataOverview.rightsStatistics().then(r => {
        if (r) {
          this.parsedata(r);
        } else {
          // history.push('/login');
        }
      });
    } else {
      const { id } = this.props;
      api.issuer.rightsStatistics({
        issuerId: id
      }).then(r => {
        if (r) {
          this.parsedata(r);
        }

      });
    }


  }

  exportShow(row) {
    this.setState({
      showExportModal: true,
      currentRow: row,
    });
    if (this.InputEl) {
      this.InputEl.setState({ value: '' });
    }
  }

  export() {
    if (this.state.currentRow) {
      const row = this.state.currentRow;
      const { value } = this.InputEl.input;
      if (!value || value <= 0) {
        message.error('导出数量要大于0');
        return;
      }
      if (value > row.stock) {
        message.error('剩余数量不足');
        return;
      }
      this.setState({
        showExportModal: false,
      });
      // 正式导出
      const hide = message.loading('正在导出...');
      api.dataOverview.cdkExport({
        packageId: row.pkgId,
        count: value,
        isCarryCdKey: 1,
      })
        .then(result => {
          hide();
          if (result) {
            window.location.href = result;
          }
        })
        .catch(() => {
          hide();
        });
    }
  }

  parsedata(data) {
    const list = [];
    data && data.forEach(item => {
      item.rightsDetails.forEach((right, index) => {
        list.push({
          ...right,
          pkgId: item.pkgId,
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
            rowKey="pkgName"
            bordered
            pagination={false}
          />
        </div>
        <Modal
          title="提示"
          visible={this.state.showExportModal}
          onOk={() => this.export()}
          onCancel={() => this.setState({ showExportModal: false })}
        >
          <Form layout="inline">
            <Form.Item label="导出数量">
              <Input
                placeholder=""
                // eslint-disable-next-line no-return-assign
                ref={el => (this.InputEl = el)}
                type="number"
              />
            </Form.Item>
            <Form.Item>
              <span>
                <span style={{ color: 'red' }}>*</span>剩余
                {this.state.currentRow ? this.state.currentRow.stock : 0}
              </span>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
