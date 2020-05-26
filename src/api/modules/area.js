

import request from '../../utils/request';


/**
 * @memberof module:apis
 * @description: 描述方法
 * @function provinces
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const provinces = (data = {}) => {
  return request.post({
    url: 'area/provinces', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function districts
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const districts = (data = {}) => {
  return request.post({
    url: 'area/districts', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function cities
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const cities = (data = {}) => {
  return request.post({
    url: 'area/cities', data,
  });
};

/**
 * @memberof module:apis
 * @description: 描述方法
 * @function areaTree
 * @param {type}  传入参数
 * @author 陈(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */
export const areaTree = (data = {}) => {
  return request.post({
    url: 'area/area_tree', data,
  });
};
