import React, { useEffect, useState } from 'react';
import { Tag, Select } from 'antd';

const { Option } = Select;

const Custom = (props) => {
  const { value = [], onChange, tagList = [], request } = props;
  const [list, setList] = useState([]);

  const [tagSource, setTagSource] = useState(tagList);
  const [isClick, setIsClick] = useState(false);

  const selectChange = async (item, val1) => {
    let selectItem = item[0];
    let isHave = false;
    setIsClick(false);
    const arr = [...list];
    if (val1[0].value) {
      const filterTagSourse = tagSource.filter((it) => it.id !== selectItem.key);
      setTagSource(filterTagSourse);
    } else {
      selectItem = await request(selectItem.value);
      isHave = list.some((it1) => it1.key === selectItem.id);
      if (!isHave) {
        selectItem.value = selectItem.id;
        selectItem.key = selectItem.id;
        selectItem.label = selectItem.name;
      }
    }
    if (!isHave) {
      arr.push(selectItem);
      setList(arr);
    }
  };

  const tagClick = (index) => {
    const arr = [...list];
    const it = arr.splice(index, 1);
    setList(arr);
    const targetItem = tagList.find((item) => item.id === it[0].key);
    const tagArr = [...tagSource];
    tagArr.push(targetItem);
    setTagSource(tagArr);
  };

  const onBlur = () => {
    setIsClick(false);
  };

  const filterTagList = (arrSource, tagArr = []) => {
    const filterList = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const i of tagArr) {
      filterList.push(arrSource.find((item) => item.id === i));
    }

    const result = filterList.map((item) => {
      const it = { ...item };
      it.value = item.id;
      it.key = item.id;
      it.label = item.name;
      return it;
    });
    setList(result);
    const SourceList = arrSource.filter((item) => !tagArr.includes(item.id));
    setTagSource(SourceList);
  };

  useEffect(() => {
    if (value && value.length !== 0) {
      filterTagList(tagList, value);
    } else {
      filterTagList(tagList, []);
    }
    setIsClick(false);
  }, [value ? value.toString() : value]);

  useEffect(() => {
    const selectList = list.map((item) => item.key);
    onChange(selectList);
  }, [list.length]);

  return (
    <div>
      {list.map((item, index) => (
        <Tag key={item.key} closable onClose={() => tagClick(index)}>
          {item.label}
        </Tag>
      ))}
      {list.length < 3 && (
        <>
          {isClick ? (
            <Select
              mode="tags"
              size="small"
              onBlur={onBlur}
              labelInValue
              autoClearSearchValue={false}
              showSearch
              style={{ width: 100 }}
              onChange={selectChange}
            >
              {tagSource.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          ) : (
            <Tag onClick={() => setIsClick(true)}>添加标签</Tag>
          )}
        </>
      )}
    </div>
  );
};

export default Custom;
