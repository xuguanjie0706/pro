
import request from '../../utils/request';

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function userInfo
 * @param {type}  传入参数
 * @author 张庆(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/userinfoUsingPOST}
 * @return {object} 接口对象
 */

export const userInfo = (data = {}) => {
  return request.post({
    url: 'user/userinfo', data,
  });
};


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function userInfo
 * @param {type}  传入参数
 * @author 张庆(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/userinfoUsingPOST}
 * @return {object} 接口对象
 */

export const getInviteUrl = (data = {}) => {
  return request.post({
    url: 'user/get_invite_url', data,
  });
};


// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
// export async function queryNotices() {
//   return request('/api/notices');
// }
