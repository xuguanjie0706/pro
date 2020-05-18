
import React from 'react';
import styles from './index.less';


const TitleCard = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.tip} />
      <div className={styles.title}>{props.title}</div>
      <div style={{ float: 'right', marginTop: -4 }}>
        {props.children}
      </div>
    </div>
  );
};

export default TitleCard;
