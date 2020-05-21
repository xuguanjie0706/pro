/**
 * @module  组件
 * @description: 时间筛选
 * @param {arrry} TypeSource
 * @return:
 */
import React, { useState, useEffect } from 'react';
import { Radio, DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const defaultTypeSource = [{ key: -1, value: '昨天', diff: 0 }, { key: 0, value: '今天', diff: 0 }, { key: -6, value: '近7天', diff: 6 }, { key: -29, value: '近30天', diff: 29 }];
const DateFilter = ({ value = {}, onChange, TypeSource = defaultTypeSource, callback }) => {

  const [timeData, setTimeData] = useState([]);
  const [dateType, setDateType] = useState('');

  const changePicker = (e) => {
    setDateType('');
    setTimeData(e);
  };

  const changeType = (e) => {
    setDateType(e.target.value);
    const type = JSON.parse(e.target.value);
    const startTime = moment().add('days', type.key);
    const endTime = moment().add('days', (type.key + type.diff));
    setTimeData([startTime, endTime]);
  };

  useEffect(() => {
    setTimeData(value);
  }, []);

  useEffect(() => {
    if (callback) { callback(timeData); }
    onChange(timeData);
  }, [timeData]);
  return (
    <div>
      <RangePicker
        value={timeData}
        onChange={changePicker}
        placeholder={['', '']}
        separator="至"
        style={{ marginRight: 10 }}
      />
      <Radio.Group
        buttonStyle="solid"
        value={dateType}
        onChange={changeType}
      >
        {TypeSource.map(item => <Radio.Button key={item.key} value={JSON.stringify(item)}>
          {item.value}
        </Radio.Button>
        )}
      </Radio.Group>
    </div>
  );
};

export default DateFilter;
