

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function list
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const list = (data = {}) => {
  return request.post({
    url: 'agent/list', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function applyList
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const applyList = (data = {}) => {
  return request.post({
    url: 'agent/apply_list', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function selectionList
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const selectionList = (data = {}) => {
  return request.post({
    url: 'agent/selection_list', data,
  });
};
