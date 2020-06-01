/* 分发状态 */
export const STATUS_LIST = {
  1: '未领取',
  2: '待激活',
  3: '使用中',
  4: '已过期',
  5: '7天内到期',
  6: '30天内到期',
};

/* 权限 */
export const ROLE_LIST = {
  1: '渠道商',
  2: '代理人',
  3: '百度', // 当前不需要考虑
  4: '渠道用户',// 当前不需要考虑
  5: '代理商',
  6: '销售', // 一个菜单
  7: '产业合伙人' // 一个菜单
};
/* 代理登记 */
export const LEVEL_LIST = {
  1: '区域独家代理',
  2: '区域代理',
  3: '健康团团长'
};

/* 代理状态 */
export const AGENT_STATUS_LIST = {
  0: '正常',
  1: '已冻结',
};

/* 激活方式 */
export const BATCH_TYPE_LIST = {
  1: '权益分发即生效',
  2: '权益领取后生效',
};

export const TRANSFER_STATUS_LIST = {
  0: '进行中',
  1: '已完成',
  2: '失败'
};


/* 代理类型 */
export const AGENT_TYPE_LIST = {
  1: '个人',
  2: '企业'
};


/* 分发的状态 */
export const DISTRIBUTE_STATUS_LIST = {
  0: '正在处理',
  1: '已完成',
  2: '分发失败'
};
// 正在处理、部分完成、已完成和分发失败
