import { useState, useMemo } from 'react';
import { Flex, DatePicker } from 'antd-mobile';
import moment from 'moment';
import styles from './style.less';

// 筛选
export default props => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    dateBtn: null,
    groupId: null,
    tagId: null,
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
      groupId: null,
      tagId: null,
    });
  }

  function executeFilter() {
    const values = {
      createDtBeg: formatDate(filters.startDate),
      createDtEnd: formatDate(filters.endDate),
      groupId: filters.groupId,
      tagId: filters.tagId,
    };

    const result = {};
    Object.keys(values).forEach(key => {
      values[key] && (result[key] = values[key]);
    });
    props.onFilter(result);
  }

  const groups = useMemo(() => {
    return props.groups.map(item => {
      return { name: item.name, value: item.id };
    });
  }, [props.groups]);

  const tags = useMemo(() => {
    return props.tags.map(item => {
      return { name: item.name, value: item.id };
    });
  }, [props.tags]);

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
          <div className={styles.filterItemTitle}>分组</div>
          <Flex direction="row" wrap="wrap" className={styles.filterBtnRowWrap}>
            {groups.map(item => (
              <div className={styles.filterBtnWrap} key={item.name}>
                <div
                  className={
                    styles.filterBtn +
                    (filters.groupId === item.value ? ' active' : '')
                  }
                  onClick={() => {
                    if (filters.groupId === item.value) {
                      changeFilters({ groupId: null });
                    } else {
                      changeFilters({ groupId: item.value });
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
          <div className={styles.filterItemTitle}>标签</div>
          <Flex direction="row" wrap="wrap" className={styles.filterBtnRowWrap}>
            {tags.map(item => (
              <div className={styles.filterBtnWrap} key={item.value}>
                <div
                  className={
                    styles.filterBtn +
                    (filters.tagId === item.value ? ' active' : '')
                  }
                  onClick={() => {
                    if (filters.tagId === item.value) {
                      changeFilters({ tagId: null });
                    } else {
                      changeFilters({ tagId: item.value });
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
