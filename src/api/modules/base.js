

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
// export const query = ({ params, data }) => {
//   return request.post({
//     url: '/api/users',
//     params,
//     data
//   });
// };
export const loginByPwd = ({ params, data }) => {
  return request.post({
    url: 'login_by_pwd', params, data,
    // headers: { 'Content-Type': 'multipart/form-data' }
  });
};


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function getbasePage
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const getbasePage = () => {
  return request('base/getone');
};
