

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function pkgDetailList
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const pkgDetailList = (data = {}) => {
  return request.post({
    url: 'agent_cdkey/pkg_detail_list', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function pkgList
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const pkgList = (data = {}) => {
  return request.post({
    url: 'agent_cdkey/pkg_list', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function transferAgent
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const transferAgent = (data = {}) => {
  return request.post({
    url: 'agent_cdkey/transfer_2_agent', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function transferList
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const transferList = (data = {}) => {
  return request.post({
    url: 'agent_cdkey/transfer_list', data,
  });
};
