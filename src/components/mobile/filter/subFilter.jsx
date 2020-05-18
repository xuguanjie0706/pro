import { useState, useRef } from 'react';
import { Flex, DatePicker, InputItem, List } from 'antd-mobile';
import moment from 'moment';
import styles from './style.less';
import { createForm } from 'rc-form';

// 筛选
export default createForm()(props => {
  const { getFieldProps, getFieldValue, setFieldsValue } = props.form;

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
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

  function resetFilter() {
    setFieldsValue({ name: '', phone: '' });
    setFilters({
      startDate: '',
      endDate: '',
    });
  }

  function executeFilter() {
    const values = {
      issuerName: getFieldValue('name'),
      issuerMobile: getFieldValue('phone'),
      createDtBeg: formatDate(filters.startDate, 2),
      createDtEnd: formatDate(filters.endDate, 2),
    };
    const result = {};
    Object.keys(values).forEach(key => {
      values[key] && (result[key] = values[key]);
    });
    props.onFilter(result);
  }

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
            添加时间
          </div>
          <div className={styles.filterBtn} style={{ textAlign: 'left' }}>
            <DatePicker
              title="开始时间"
              extra="请选择"
              mode="date"
              value={filters.startDate}
              maxDate={filters.endDate}
              onChange={val => changeFilters({ startDate: val })}
            >
              <div>
                <span className={styles.pickerLabel}>开始时间：</span>
                {formatDate(filters.startDate)}
              </div>
            </DatePicker>
          </div>
          <div
            className={styles.filterBtn + ' ' + styles.filterBtnSplit}
            style={{ textAlign: 'left' }}
          >
            <DatePicker
              title="结束时间"
              extra="请选择"
              mode="date"
              value={filters.endDate}
              minDate={filters.startDate}
              onChange={val => changeFilters({ endDate: val })}
            >
              <div>
                <span className={styles.pickerLabel}>结束时间：</span>
                {formatDate(filters.endDate)}
              </div>
            </DatePicker>
          </div>
        </div>
        <div className={styles.filterItem}>
          <div className={styles.filterItemTitle}>姓名</div>
          <List className={styles.filterInputWrap}>
            <InputItem
              type="text"
              clear
              className={styles.filterInput}
              placeholder="姓名"
              {...getFieldProps('name')}
            />
          </List>
        </div>
        <div className={styles.filterItem}>
          <div className={styles.filterItemTitle}>手机号</div>
          <List className={styles.filterInputWrap}>
            <InputItem
              type="number"
              clear
              className={styles.filterInput}
              placeholder="手机号"
              {...getFieldProps('phone')}
            />
          </List>
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
});
