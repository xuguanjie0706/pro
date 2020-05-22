

import React, { useEffect, useState } from 'react';
import { Tag, Select } from 'antd';


const { Option } = Select;

const Custom = (props) => {
  const { value = [], onChange, tagList = [] } = props;
  const [list, setList] = useState([]);
  const [tagSource, setTagSource] = useState(tagList);
  // const tagSource = [...tagList];
  console.log(value);

  const [isClick, setIsClick] = useState(false);

  // console.log(tagList, name);

  const selectChange = (item) => {
    setIsClick(false);
    const arr = [...list];
    const filterTagSourse = tagSource.filter(it => it.id !== item.key);
    setTagSource(filterTagSourse);
    arr.push(item);
    setList(arr);
  };

  const tagClick = (index) => {
    const arr = [...list];
    const it = arr.splice(index, 1);
    setList(arr);
    const targetItem = tagList.find(item => item.id === it[0].key);
    const tagArr = [...tagSource];
    tagArr.push(targetItem);
    setTagSource(tagArr);
  };

  const onSearch = (item) => {
    console.log(item);

  };
  const onBlur = (item) => {
    console.log(item);
  };


  const filterTagList = (arrSource, tagArr = []) => {
    const filterList = arrSource.filter(item => tagArr.includes(item.id));
    const result = filterList.map(item => {
      const it = { ...item };
      it.value = item.id;
      it.key = item.id;
      it.label = item.name;
      return it;
    });
    setList(result);
    const SourceList = arrSource.filter(item => !tagArr.includes(item.id));
    setTagSource(SourceList);
  };

  useEffect(() => {
    if (value) {
      filterTagList(tagList, value);
    } else {
      filterTagList(tagList, []);
    }
    setIsClick(false);
  }, [value ? value.length : value]);

  useEffect(() => {
    const selectList = list.map(item => item.key);
    onChange(selectList);
  }, [list.length]);
  return (
    <div >
      {list.map((item, index) => <Tag key={item.key} closable onClose={() => tagClick(index)}>{item.label}</Tag>)}
      {list.length < 3 && <>
        {isClick ?
          <Select size="small" onBlur={onBlur} labelInValue autoClearSearchValue={false} showSearch onSearch={onSearch} style={{ width: 100 }} onChange={selectChange}>
            {tagSource.map(item => <Option key={item.id} value={item.id}>
              {item.name}
            </Option>)}
          </Select> : <Tag onClick={() => setIsClick(true)}>添加标签</Tag>}
      </>}

    </div>
  );
};

export default Custom;
