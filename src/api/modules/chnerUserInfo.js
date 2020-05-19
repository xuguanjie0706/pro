

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function List
 * @param {type}  传入参数
 * @author 张庆(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%B8%A0%E9%81%93%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%866}
 * @return {object} 接口对象
 */

export const List = (data) => {
  return request.post({
    url: 'chner_user_info/list', data,
  });
};


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function Update
 * @param {type}  传入参数
 * @author 张庆(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%B8%A0%E9%81%93%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86}
 * @return {object} 接口对象
 */
export const Update = (data) => {
  return request.post({
    url: 'chner_user_info/update', data,
  });
};
