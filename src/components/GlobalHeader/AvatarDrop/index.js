import React from 'react';
import { Popover, Avatar } from 'antd';
import { connect } from 'umi';
import defaultAvatar from '@/assets/img/avatar/default.png';
import more from '@/assets/img/avatar/btn_more.png';
import { LEVEL_LIST } from '@/utils/enum';
import styles from './index.less';

const LoginUserHeader = (props = {}) => {
  const { user, dispatch } = props;
  const { realName, agentAreaList = [] } = user;
  // console.log(user);

  const logOut = () => {
    dispatch({
      type: 'login/loginOut'
    });
  };

  return (
    <div className={styles.header}>
      <Popover
        placement="bottom"
        title={
          <div className={styles.titleRoom}>
            {agentAreaList && agentAreaList.map(item => <div key={item.agentArea}> <div>{item.agentArea.replace(/-/g, '/')}/{LEVEL_LIST[item.agentLevel]}</div> <div className="hl-title2">创建日期：{item.createAt}</div>  </div>)}
            {/* {agentAreaList && agentAreaList.map(item => <div key={item.agentArea}> <div>{item.agentArea.replace(/-/g, '/')}/{LEVEL_LIST[item.agentLevel]}</div> <div className="hl-title2">创建日期：{item.createAt}</div>  </div>)} */}
            {/* <div className={styles.channelTag}>{tag}</div> */}
            {/* < div className={styles.time} >
              创建日期： {createAt && createAt.substring(0, 10)}
            </div> */}
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
            {realName}
          </span>
          <img src={more} style={{ height: 13 }} alt="" />
        </span>
      </Popover>
    </div>
  );
};

export default connect(({ login }) => ({ user: login.info }))(LoginUserHeader);
