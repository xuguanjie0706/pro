import styles from './userFilter.less';
import { Fragment } from 'react';
import { Icon } from 'antd-mobile';

export default props => {
  function clear(e) {
    e.stopPropagation();
    props.onClear();
  }

  return (
    <div
      onClick={props.onClick}
      className={styles.searchInputBtn}
      style={props.style}
    >
      <div className={styles.searchIcon}></div>
      <span className={styles.searchValue}>
        {props.children ? (
          <Fragment>
            {props.children}
            <Icon
              type="cross-circle-o"
              size="xxs"
              className={styles.clearUserFilter}
              onClick={clear}
            />
          </Fragment>
        ) : (
          <span className={styles.searchPlacehoder}>昵称/手机号</span>
        )}
      </span>
    </div>
  );
};
