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

export const upload = ({ data, onUploadProgress }) => {
  return request.post({
    url: 'comm/upload_file', data, onUploadProgress
    // headers: { 'Content-Type': 'multipart/form-data' }
  });
};
