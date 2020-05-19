

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function cardIssueRecord
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%95%B0%E6%8D%AE%E6%A6%82%E8%A7%88/cardDataUsingPOST}
 * @return {object} 接口对象
 */
export const cardIssueRecord = (data = {}) => {
  return request.post({
    url: 'issuer/card_issue_record', data
  });
};


/**
 * @memberof module:apis
 * @description: 领卡趋势
 * @function distributionStatistics
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://beta-oms2.halove.com/v1/starry/saas/swagger-ui.html#/%E6%95%B0%E6%8D%AE%E6%A6%82%E8%A7%88/cardTrendsUsingPOST}
 * @return {object} 接口对象
 */

export const distributionStatistics = (data = {}) => {
  return request.post({
    url: 'issuer/distribution_statistics', data
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
    url: 'issuer/rights_statistics', data
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

export const userList = ({ data = {} }) => {
  return request.post({
    url: '/issuer/user_list', data
  });
};
