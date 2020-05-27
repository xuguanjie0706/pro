

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function batchList
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const batchList = (data = {}) => {
  return request.post({
    url: 'card_binding/batch_list', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function batchImport
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const batchImport = (data = {}) => {
  return request.post({
    url: 'card_binding/batch_import', data,
  });
};
