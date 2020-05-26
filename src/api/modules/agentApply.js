

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function loginByPwd
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const sendSmsCode = (data = {}) => {
  return request.post({
    url: 'agent_apply/send_sms_code', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function listApplicableAgentLevel
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const listApplicableAgentLevel = (data = {}) => {
  return request.post({
    url: 'agent_apply/list_applicable_agent_level', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function listApplicableAgentLevel
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const applyFirst = (data = {}) => {
  return request.post({
    url: 'agent_apply/apply_first', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function listApplicableAgentLevel
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const apply = (data = {}) => {
  return request.post({
    url: 'agent_apply/apply', data,
  });
};
