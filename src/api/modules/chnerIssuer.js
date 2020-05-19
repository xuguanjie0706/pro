

import request from '../../utils/request';

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function batchGroupSave
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E4%BB%A3%E7%90%86%E4%BA%BA%E7%AE%A1%E7%90%86/batchGroupSaveUsingPOST}
 * @return {object} 接口对象
 */

export const batchGroupSave = ({ params, data }) => {
  return request.post({
    url: 'chner_issuer/batch_group_save', params, data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function Create
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E4%BB%A3%E7%90%86%E4%BA%BA%E7%AE%A1%E7%90%86/createUsingPOST}
 * @return {object} 接口对象
 */

export const Create = ({ params, data }) => {
  return request.post({
    url: 'chner_issuer/create', params, data,
  });
};
/**
 * @memberof module:apis
 * @description: 描述方法
 * @function Liquidate
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E4%BB%A3%E7%90%86%E4%BA%BA%E7%AE%A1%E7%90%86/liquidateUsingPOST}
 * @return {object} 接口对象
 */

export const Liquidate = ({ params, data }) => {
  return request.post({
    url: 'chner_issuer/liquidate', params, data,
  });
};
/**
 * @memberof module:apis
 * @description: 描述方法
 * @function List
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E4%BB%A3%E7%90%86%E4%BA%BA%E7%AE%A1%E7%90%86/listUsingPOST_1}
 * @return {object} 接口对象
 */

export const List = ({ params, data }) => {
  return request.post({
    url: 'chner_issuer/list', params, data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function Update
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E4%BB%A3%E7%90%86%E4%BA%BA%E7%AE%A1%E7%90%86/updateUsingPOST}
 * @return {object} 接口对象
 */

export const Update = (data) => {
  return request.post({
    url: 'chner_issuer/update', ...data,
  });
};
