import copy from 'copy-to-clipboard';
import { Toast } from 'antd-mobile';

export function copyString(string, message) {
  const result = copy(string);
  result
    ? Toast.success(message || '已复制', 1, null, false)
    : Toast.info('如果复制不成功，请手动复制', 1, null, false);
}

export function rcErrorsToString(errors) {
  if (!errors) {
    return errors;
  }
  const msg = Object.values(errors)
    .map(i => i.errors.map(ii => ii.message).join('，'))
    .join('，');
  return msg;
}

export const statusObj = {
  1: '未领取',
  2: '待激活',
  3: '使用中',
  4: '已过期',
  5: '7天内到期',
  6: '30天内到期',
};

export const userStatusObj = {
  0: '暂无权益',
  1: '使用中',
  2: '已过期',
  3: '7天内到期',
  4: '30天内到期',
};
