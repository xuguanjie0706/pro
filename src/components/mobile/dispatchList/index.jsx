import { Pagination, Icon, Flex } from 'antd-mobile';
import styles from './style.less';
import moment from 'moment';
import { copyString, statusObj } from '../common';
import { useState, Fragment } from 'react';

function cssSupport(attr, value) {
  var element = document.createElement('div');
  if (attr in element.style) {
    element.style[attr] = value;
    return element.style[attr] === value;
  } else {
    return false;
  }
}
const supportSticky = cssSupport('position', 'sticky');

export default function(props) {
  function dateFormat(date) {
    const m = moment(date);
    if (m.isValid()) {
      return m.format('YYYY/MM/DD HH:mm:ss');
    }
    return '-';
  }

  function statusFormat(status, item) {
    if (status == 1 && props.resend) {
      return (
        <span>
          {statusObj[status]}，
          <a className={styles.primaryColor} onClick={() => props.resend(item)}>
            重发
          </a>
        </span>
      );
    }
    return statusObj[status] || '-';
  }

  function mobileFormat(string) {
    if (!string) {
      return '-';
    }
    const hideMobile = string.slice(0, 3) + '****' + string.slice(8);
    return (
      <span>
        <span className={styles.primaryColor}>{hideMobile}</span>
        <span
          className={styles.copyTextIcon}
          onClick={() => copyString(string, '已复制手机号')}
        ></span>
      </span>
    );
  }

  function nickNameFormat(string, item) {
    return (
      <Flex align="center" className={styles.userNickname}>
        {item.userAvatar ? (
          <img src={item.userAvatar} className={styles.userAvatar} />
        ) : (
          <div className={styles.userAvatar}></div>
        )}
        <span className={styles.usernameTd}>{string || '-'}</span>
      </Flex>
    );
  }

  const [tdShadow, setTdShadow] = useState(false);
  function onTableScroll(e) {
    const show = e.target && e.target.scrollLeft && e.target.scrollLeft > 20;
    if (show !== tdShadow) {
      setTdShadow(show);
    }
  }

  let firstTdClass = '';
  if (supportSticky) {
    firstTdClass =
      styles.useSticky + ' ' + (tdShadow ? styles.shadowRight : '');
  }

  return (
    <div>
      <div className={styles.disPatchTableWrap} onScroll={onTableScroll}>
        {props.list.length === 0 ? (
          <div className={styles.emptyData}>
            <div className={styles.emptyDataImg}></div>
            <div>暂无数据</div>
          </div>
        ) : (
          <Fragment>
            <table className={styles.disPatchTable}>
              <colgroup>
                <col style={{ width: 80 }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={firstTdClass}>用户</th>
                  <th>手机号</th>
                  <th>状态</th>
                  <th>分发时间</th>
                  <th>套餐名称</th>
                  <th>卡号</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                {props.list.map((item, index) => (
                  <tr key={item.id + '-' + index}>
                    <td className={firstTdClass}>
                      {nickNameFormat(item.nickName, item)}
                    </td>
                    <td>{mobileFormat(item.userMobile)}</td>
                    <td>{statusFormat(item.status, item)}</td>
                    <td>{dateFormat(item.issueTime)}</td>
                    <td>{item.pkgName || '-'}</td>
                    <td>{item.cardNo || '-'}</td>
                    <td>{item.remark || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {props.total > 0 ? (
              <Pagination
                className={styles.pagination}
                total={props.total}
                current={props.current}
                onChange={props.changePage}
                locale={{
                  prevText: <Icon type="left" />,
                  nextText: <Icon type="right" />,
                }}
              ></Pagination>
            ) : (
              <div></div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}
