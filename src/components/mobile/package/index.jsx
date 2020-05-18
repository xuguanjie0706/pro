import { Flex } from 'antd-mobile';
import styles from './style.less';
import { useLayoutEffect, useRef } from 'react';

export default props => {
  const data = props.data || {
    items: [],
  };
  const containerRef = useRef();
  useLayoutEffect(() => {
    props.flexHeight && props.flexHeight(containerRef.current.clientHeight);
  });
  function timesFormat(text) {
    if (text == '不限次') {
      return '';
    }
    return '，次数：' + text;
  }
  return (
    <div className={styles.container} ref={containerRef}>
      <Flex direction="row" align="stretch" justify="between">
        <span className={styles.title}>{data.pkgName}</span>
        <div>{props.button}</div>
      </Flex>
      <ul className={styles.items}>
        {data.rightsDetails.map(item => (
          <li className={styles.item} key={item.prdName}>
            <Flex direction="row" justify="between">
              <span className={styles.itemTitle}>{item.prdName}</span>
              <span className={styles.itemExpired}>
                有效期：{item.validDays}天{timesFormat(item.times)}
              </span>
            </Flex>
            <p className={styles.itemDetail}>{item.prdDesc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
