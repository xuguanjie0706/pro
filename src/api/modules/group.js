

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function List
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86/listUsingPOST_3}
 * @return {object} 接口对象
 */

export const List = ({ params, data }) => {
  return request.post({
    url: 'group/list', params, data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function Save
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86/listUsingPOST_3}
 * @return {object} 接口对象
 */

export const Save = ({ params, data }) => {
  return request.post({
    url: 'group/save', params, data,
  });
};
