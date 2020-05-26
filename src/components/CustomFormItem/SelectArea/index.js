import React from 'react';
import { Cascader } from 'antd';
import areaOption from './area';

const SelectArea = (props) => {
  const { value, setItem } = props;
  // console.log(value);

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const d = value.split('-');
  //   setData(d);
  // }, []);
  const onChange = (v, a) => {
    // console.log(v, a);
    const selectTitle = a.map(item => item.label).join('-');
    // console.log(selectTitle);

    setItem(v, 'label');
    setItem(selectTitle, 'agentArea');
  };
  return (
    <Cascader value={value} fieldNames={{ label: 'label', value: 'value' }} options={areaOption} onChange={onChange} placeholder="请选择代理区域" />
  );
};


export default SelectArea;
