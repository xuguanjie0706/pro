import React from 'react';
import { Popover, Avatar } from 'antd';
import { connect } from 'umi';
import defaultAvatar from '@/assets/img/avatar/default.png';
import more from '@/assets/img/avatar/btn_more.png';
import styles from './index.less';

const LoginUserHeader = (props = {}) => {
  const { tag, name, createAt = '19994' } = props;

  const logOut = () => {

  };

  return (
    <div className={styles.header}>
      <Popover
        placement="bottom"
        title={
          <div style={{ paddingTop: 8 }}>
            <div className={styles.channelTag}>{tag}</div>
            <div className={styles.time}>
              创建日期：{createAt.substring(0, 10)}
            </div>
          </div>
        }
        content={
          <div className={styles.logout} onClick={logOut}>
            退出登录
          </div>
        }
      >
        <span style={{ cursor: 'pointer' }}>
          <Avatar
            style={{ border: '1px solid #EEEEEE', marginRight: 8 }}
            src={defaultAvatar}
            size={32}
          />
          <span style={{ fontSize: 16, marginRight: 8, fontWeight: 500 }}>
            {name}
          </span>
          <img src={more} style={{ height: 13 }} alt="" />
        </span>
      </Popover>
    </div>
  );
};

export default connect(({ user }) => ({ user }))(LoginUserHeader);
