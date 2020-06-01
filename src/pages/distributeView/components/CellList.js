import React from 'react';
import './Cell.less';

const CellList = (props) => {
  const { defaultData } = props;
  return (
    <div className="dis-cell-list" >
      {
        defaultData.map(item => <div key={item.name} className="dis-cell" >
          <div className="dis-cell-left dis-cell-item">{item.name}</div>
          <div className=" dis-cell-item">{item.mobile}</div>
        </div>)
      }
    </div >
  );
};
export default CellList;
