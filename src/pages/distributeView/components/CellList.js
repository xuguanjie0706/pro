import React from 'react';
import './Cell.less';

const CellList = () => {
  const list = Array(10).fill({
    name: '1fdafdafdadffafdafadfadf23', mobile: 18079442433
  });
  return (
    <div className="dis-cell-list" >
      {
        list.map(item => <div className="dis-cell" >
          <div className="dis-cell-left dis-cell-item">{item.name}</div>
          <div className=" dis-cell-item">{item.mobile}</div>
        </div>)
      }
    </div >
  );
};
export default CellList;
