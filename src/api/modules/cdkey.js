

import request from '../../utils/request';

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function allocateUser
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E5%85%91%E6%8D%A2%E7%A0%81%E7%AE%A1%E7%90%86/allocate2UserUsingPOST}
 * @return {object} 接口对象
 */

export const allocateUser = ({ params, data }) => {
  return request.post({
    url: 'cdkey/allocate_2_user', params, data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function allocateRemarkSave
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E5%85%91%E6%8D%A2%E7%A0%81%E7%AE%A1%E7%90%86/allocateRemarkSaveUsingPOST}
 * @return {object} 接口对象
 */

export const allocateRemarkSave = ({ params, data }) => {
  return request.post({
    url: 'cdkey/allocate_remark_save', params, data,
  });
};
/**
 * @memberof module:apis
 * @description: 描述方法
 * @function batchAllocateUser
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E5%85%91%E6%8D%A2%E7%A0%81%E7%AE%A1%E7%90%86/batchAllocate2UserUsingPOST}
 * @return {object} 接口对象
 */

export const batchAllocateUser = ({ params, data }) => {
  return request.post({
    url: 'cdkey/batch_allocate_2_user', params, data,
  });
};
/**
 * @memberof module:apis
 * @description: 描述方法
 * @function pkgDetailList
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E5%85%91%E6%8D%A2%E7%A0%81%E7%AE%A1%E7%90%86/pkgDetailListUsingPOST}
 * @return {object} 接口对象
 */

export const pkgDetailList = ({ params, data }) => {
  return request.post({
    url: 'cdkey/pkg_detail_list', params, data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function pkgList
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E5%85%91%E6%8D%A2%E7%A0%81%E7%AE%A1%E7%90%86/pkgListUsingPOST}
 * @return {object} 接口对象
 */

export const pkgList = (data = {}) => {
  return request.post({
    url: 'cdkey/pkg_list', data,
  });
};


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function transferUsert
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E5%85%91%E6%8D%A2%E7%A0%81%E7%AE%A1%E7%90%86/transfer2UserUsingPOST}
 * @return {object} 接口对象
 */

export const transferUsert = ({ params, data }) => {
  return request.post({
    url: 'cdkey/transfer_2_usert', params, data,
  });
};


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function transferList
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E5%85%91%E6%8D%A2%E7%A0%81%E7%AE%A1%E7%90%86/transferListUsingPOST}
 * @return {object} 接口对象
 */

export const transferList = (data) => {
  return request.post({
    url: 'cdkey/transfer_list', ...data,
  });
};
