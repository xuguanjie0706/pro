import React from 'react';
import './CardRoom.less';

const CardRoom = (props) => {
  const { title = '个人信息', children } = props;
  return (
    <div className="cardRoom">
      <div className="cardRoom-header">
        <div className="cardRoom-header-title"> {title}</div>

      </div>
      <div style={{ paddingTop: 32 }}>
        {children}
      </div>

    </div>
  );
};


export default CardRoom;
