import { Flex, List, InputItem } from 'antd-mobile';
import indexStyles from './style.less';
import styles from './userFilter.less';
import { issuerUserList } from '@/pages/mobile/api';
import debounce from 'lodash/debounce';
import { useState, useRef, useMemo, Fragment } from 'react';

export default props => {
  const lastFetchId = useRef(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUser = useMemo(() => {
    return debounce(value => {
      if (!value) {
        setLoading(false);
        setList([]);
        return;
      }
      lastFetchId.current += 1;
      const fetchId = lastFetchId.current;
      setLoading(true);
      setList([]);
      issuerUserList({ body: { keyword: value } })
        .then(res => {
          setLoading(false);
          if (fetchId !== lastFetchId.current) {
            // for fetch callback order
            return;
          }
          if (res.data) {
            setList(res.data.list);
          }
        })
        .catch(err => {
          setList([]);
          setLoading(false);
        });
    }, 800);
  }, []);

  return (
    <Flex
      className={indexStyles.filterBox}
      direction="column"
      align="stretch"
      style={props.style}
    >
      <List className={styles.filterInputWrap}>
        <InputItem
          type="text"
          clear
          labelNumber={1}
          onChange={val => {
            setLoading(true);
            fetchUser(val);
          }}
          placeholder="请输入昵称/手机号"
          className={styles.filterInput}
        >
          <div className={styles.searchIcon}></div>
        </InputItem>
      </List>
      <div className={styles.userList}>
        {loading ? <div className={styles.userItem}>查询中...</div> : ''}
        {list.length === 0 && !loading ? (
          <div className={styles.emptyData}>
            <div className={styles.emptyDataImg}></div>
            <div>暂无数据</div>
          </div>
        ) : (
          ''
        )}
        {list.map(item => (
          <Flex
            key={item.userId}
            direction="row"
            align="center"
            className={styles.userItem}
            onClick={() => props.onFilter(item)}
          >
            <img src={item.headImg} className={styles.headImg}></img>
            <div className={styles.nickname}>{item.nickname}</div>
            <div className={styles.mobile}>{item.mobile}</div>
          </Flex>
        ))}
      </div>
    </Flex>
  );
};
