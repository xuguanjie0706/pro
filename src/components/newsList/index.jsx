import React, { Component } from 'react';
// import http from '@/utils/http';
import { TitleCard } from '@/components';
import styles from './index.less';

export default class NewList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    productList: [
      {
        title: '微医通电话问诊即将上线',
        submitDate: '03/20',
        id: 1,
      },
      {
        title: '微医通电话问诊即将上线',
        submitDate: '03/20',
        id: 2,
      },
      {
        title: '微医通电话问诊即将上线',
        submitDate: '03/20',
        id: 3,
      },
      {
        title: '微医通电话问诊即将上线',
        submitDate: '03/20',
        id: 4,
      },
      {
        title: '微医通电话问诊即将上线',
        submitDate: '03/20',
        id: 5,
      },
      {
        title: '微医通电话问诊即将上线',
        submitDate: '03/20',
        id: 6,
      },
      {
        title: '微医通电话问诊即将上线',
        submitDate: '03/20',
        id: 7,
      },
      {
        title: '微医通电话问诊即将上线',
        submitDate: '03/20',
        id: 8,
      },
    ],
    productCenterList: [
      {
        title: '【规则】视频问诊使用规则',
        id: 1,
      },
      {
        title: '【协议】关于用户隐私的保护协议',
        id: 2,
      },
      {
        title: '【方法】电话问诊使用方法',
        id: 3,
      },
      {
        title: '【规则】视频问诊使用规则',
        id: 4,
      },
      {
        title: '【规则】视频问诊使用规则',
        id: 5,
      },
      {
        title: '【规则】视频问诊使用规则',
        id: 6,
      },
    ],
  };

  componentWillMount() {
    /* http.get('/api/getProductNewsList').then(result => {
      this.setState({ productList: result.data.data });
    });
    http.get('/api/getProductCenterList').then(result => {
      this.setState({ productCenterList: result.data.data });
    }); */
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.block}>
          <TitleCard title="产品动态">
            <a>更多</a>
          </TitleCard>
          <div className={styles.pd16}>
            {this.state.productList.map(item => {
              return (
                <div className={styles.listItem} key={item.id}>
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.block}>
          <TitleCard title="产品中心">
            <a>更多</a>
          </TitleCard>

          <div className={styles.pd16}>
            {this.state.productCenterList.map(item => {
              return (
                <div className={styles.listItem} key={item.id}>
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
