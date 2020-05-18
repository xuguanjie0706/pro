import request from '@/utils/request';

export async function query() {
  return request.init('/api/users', { data: 123 });
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
