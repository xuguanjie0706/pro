import React, { Component } from 'react';
import { Radio, DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default class DateFilter extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    dateType: '',
    date: [],
  };

  componentWillMount() {
    if (this.props.defaultValue) {
      let values = this.props.defaultValue;
      values = values.map(day => {
        if (day < 0) {
          return moment().subtract('days', Math.abs(day));
        } if (day === 0) {
          return moment();
        } if (day > 0) {
          return moment().add('days', day);
        }
        return null;
      });
      this.setState({ date: values });
      this.props.onChange(
        values,
        values.map(date => {
          date ? date.format('YYYY-MM-DD') : null;
        }),
      );
    }
  }

  onTypeChange(e) {
    let values = this.props.ranges[e.target.value];
    values = values.map(day => {
      if (day < 0) {
        return moment().subtract('days', Math.abs(day));
      } if (day === 0) {
        return moment();
      } if (day > 0) {
        return moment().add('days', day);
      }
    });
    this.setState({ date: values, dateType: e.target.value });

    this.props.onChange(
      values,
      values.map(date => {
        return date ? date.format('YYYY-MM-DD') : null;
      }),
    );
  }

  onChange(values, valueString) {
    this.setState({ date: values, dateType: '' });
    this.props.onChange(values, valueString);
  }

  render() {
    const rangeRadios = [];
    for (const i in this.props.ranges) {
      const obj = this.props.ranges[i];
      if (obj) {
        rangeRadios.push(
          <Radio.Button key={i} value={i}>
            {i}
          </Radio.Button>,
        );
      }
    }
    return (
      <div>
        <RangePicker
          value={this.state.date}
          onChange={this.onChange.bind(this)}
          placeholder={['', '']}
          separator="至"
        />
        {this.props.ranges && (
          <Radio.Group
            value={this.state.dateType}
            style={{ marginLeft: 16 }}
            onChange={this.onTypeChange.bind(this)}
          >
            {rangeRadios}
          </Radio.Group>
        )}
      </div>
    );
  }
}
