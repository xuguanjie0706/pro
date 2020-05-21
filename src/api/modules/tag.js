

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function List
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%A0%87%E7%AD%BE%E7%AE%A1%E7%90%86}
 * @return {object} 接口对象
 */

export const List = (data = {}) => {
  return request.post({
    url: 'tag/list', data,
  });
};


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function getbasePage
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%A0%87%E7%AD%BE%E7%AE%A1%E7%90%86}
 * @return {object} 接口对象
 */
export const Save = (data) => {
  return request.post({
    url: 'tag/save', data,
  });
};
