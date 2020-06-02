

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function cardData
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%95%B0%E6%8D%AE%E6%A6%82%E8%A7%88/cardDataUsingPOST}
 * @return {object} 接口对象
 */
export const cardData = (data) => {
  return request.post({
    url: 'data_overview/card_data', data
  });
};


/**
 * @memberof module:apis
 * @description: 领卡趋势
 * @function cardTrends
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%95%B0%E6%8D%AE%E6%A6%82%E8%A7%88/cardTrendsUsingPOST}
 * @return {object} 接口对象
 */

export const cardTrends = (data = {}) => {
  return request.post({
    url: 'data_overview/card_trends', data
  });
};


/**
 * @memberof module:apis
 * @description: 领卡趋势
 * @function rightsStatistics
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%95%B0%E6%8D%AE%E6%A6%82%E8%A7%88/rightsStatisticsUsingPOST}
 * @return {object} 接口对象
 */

export const rightsStatistics = (data = {}) => {
  return request.post({
    url: 'data_overview/rights_statistics', data
  });
};


/**
 * @memberof module:apis
 * @description: 领卡趋势
 * @function userStatistics
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%95%B0%E6%8D%AE%E6%A6%82%E8%A7%88/userStatisticsUsingPOST}
 * @return {object} 接口对象
 */

export const userStatistics = (data = {}) => {
  return request.post({
    url: 'data_overview/user_statistics', data
  });
};


/**
 * @memberof module:apis
 * @description: 领卡趋势
 * @function userStatistics
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%95%B0%E6%8D%AE%E6%A6%82%E8%A7%88/userStatisticsUsingPOST}
 * @return {object} 接口对象
 */

export const cdkExport = (data = {}) => {
  return request.post({
    url: 'data_overview/cdk_export', data
  });
};
