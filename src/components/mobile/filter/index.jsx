import { useState } from 'react';
import { Flex, DatePicker, List, InputItem } from 'antd-mobile';
import moment from 'moment';
import styles from './style.less';
import { statusObj } from '../common';

const statusList = Object.entries(statusObj).map(([key, value]) => ({
  value: parseInt(key),
  name: value,
}));

// 筛选
export default props => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    dateBtn: null,
    status: null,
    package: null,
  });

  function changeFilters(obj) {
    setFilters(Object.assign({}, filters, obj));
  }

  function formatDate(date, type) {
    const m = moment(date);
    if (m.isValid()) {
      return m.format('YYYY-MM-DD');
    }
    return '';
  }

  function getSomeDateRange() {
    const now = new Date();
    const yesterday = moment(now)
      .add(-1, 'day')
      .toDate();
    const lastWeekend = moment(now)
      .add(-6, 'day')
      .toDate();
    const lastMonth = moment(now)
      .add(-29, 'day')
      .toDate();
    return [
      { name: '今天', start: now, end: now },
      { name: '昨天', start: yesterday, end: yesterday },
      { name: '近7天', start: lastWeekend, end: now },
      { name: '近30天', start: lastMonth, end: now },
    ];
  }

  function resetFilter() {
    setFilters({
      startDate: '',
      endDate: '',
      dateBtn: null,
      status: null,
      package: null,
    });
  }

  function executeFilter() {
    const values = {
      startTime: formatDate(filters.startDate),
      endTime: formatDate(filters.endDate),
      status: filters.status,
      pkgId: filters.package,
    };

    const result = {};
    Object.keys(values).forEach(key => {
      values[key] && (result[key] = values[key]);
    });
    props.onFilter(result);
  }

  const packages = (props.packages || []).map(item => ({
    name: item.pkgName,
    value: item.pkgId,
  }));

  return (
    <Flex
      className={styles.filterBox}
      direction="column"
      align="stretch"
      style={props.style}
    >
      <div className={styles.filterItemList}>
        <div className={styles.filterItem}>
          <div className={styles.filterItemTitle} style={{ marginTop: 0 }}>
            发卡时间
          </div>
          <Flex direction="row" className={styles.dateFilterBtnWrap}>
            <div className={styles.filterBtn}>
              <DatePicker
                mode="date"
                title="开始时间"
                extra="请选择"
                value={filters.startDate}
                maxDate={filters.endDate}
                onChange={val =>
                  changeFilters({ startDate: val, dateBtn: null })
                }
              >
                <div>
                  {formatDate(filters.startDate) || (
                    <span className={styles.datePlaceholder}>请选择</span>
                  )}
                </div>
              </DatePicker>
            </div>
            <div
              className={styles.filterBtn}
              style={{ flexGrow: 0, marginLeft: 0 }}
            >
              至
            </div>
            <div className={styles.filterBtn} style={{ marginLeft: 0 }}>
              <DatePicker
                mode="date"
                title="结束时间"
                extra="请选择"
                value={filters.endDate}
                minDate={filters.startDate}
                onChange={val => changeFilters({ endDate: val, dateBtn: null })}
              >
                <div>
                  {formatDate(filters.endDate) || (
                    <span className={styles.datePlaceholder}>请选择</span>
                  )}
                </div>
              </DatePicker>
            </div>
          </Flex>
          <Flex direction="row" wrap="wrap" className={styles.filterBtnRowWrap}>
            {getSomeDateRange().map(item => (
              <div className={styles.filterBtnWrap} key={item.name}>
                <div
                  className={
                    styles.filterBtn +
                    (filters.dateBtn === item.name ? ' active' : '')
                  }
                  onClick={() => {
                    if (filters.dateBtn === item.name) {
                      changeFilters({
                        startDate: '',
                        endDate: '',
                        dateBtn: null,
                      });
                    } else {
                      changeFilters({
                        startDate: item.start,
                        endDate: item.end,
                        dateBtn: item.name,
                      });
                    }
                  }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </Flex>
        </div>
        <div className={styles.filterItem}>
          <div className={styles.filterItemTitle}>状态</div>
          <Flex direction="row" wrap="wrap" className={styles.filterBtnRowWrap}>
            {statusList.map(item => (
              <div className={styles.filterBtnWrap} key={item.name}>
                <div
                  className={
                    styles.filterBtn +
                    (filters.status === item.value ? ' active' : '')
                  }
                  onClick={() => {
                    if (filters.status === item.value) {
                      changeFilters({ status: null });
                    } else {
                      changeFilters({ status: item.value });
                    }
                  }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </Flex>
        </div>
        <div className={styles.filterItem}>
          <div className={styles.filterItemTitle}>套餐</div>
          <Flex direction="row" wrap="wrap" className={styles.filterBtnRowWrap}>
            {packages.map(item => (
              <div className={styles.filterBtnWrap2} key={item.value}>
                <div
                  className={
                    styles.filterBtn +
                    (filters.package === item.value ? ' active' : '')
                  }
                  onClick={() => {
                    if (filters.package === item.value) {
                      changeFilters({ package: null });
                    } else {
                      changeFilters({ package: item.value });
                    }
                  }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </Flex>
        </div>
      </div>
      <Flex direction="row" className={styles.filterFooter}>
        <Flex.Item className={styles.filterFooterBtn} onClick={resetFilter}>
          重置
        </Flex.Item>
        <Flex.Item
          className={styles.filterFooterBtn + ' primary'}
          onClick={executeFilter}
        >
          筛选
        </Flex.Item>
      </Flex>
    </Flex>
  );
};
