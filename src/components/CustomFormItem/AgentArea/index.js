import React, { useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Button } from 'antd';
import './index.less';

const { Option } = Select;

const AgentArea = (props) => {
  const { value, onChange } = props;
  const [list, setList] = useState([1, 2, 3]);
  const deleteItem = (index) => {
    const source = [...list];
    source.splice(index, 1);
    setList(source);
  };

  const add = () => {
    const source = [...list];
    source.push({});
    setList(source);
  };
  return (
    <div className="agent-area">
      <div className="agent-list ">
        {list.map((item, index) =>
          <div key={item} className="agent-item hl-margin-b10">
            <div className="left">
              <Select placeholder="代理区域">
                <Option />
              </Select>
            </div>
            <div className="right">
              <Select placeholder="代理类型">
                <Option />
              </Select>
            </div>
            < DeleteOutlined onClick={() => deleteItem(index)} className="color-gray pointer" />
          </div>)}

      </div>

      <Button
        type="dashed"
        onClick={() => {
          add();
        }}
        className="width400 hl-margin-t10"
      >
        <PlusOutlined /> 添加代理区域
      </Button>
    </div>
  );
};

export default AgentArea;
