import request from '@/utils/request';

export const query = () => {
  return request.post({
    url: '/api/users',
    params: {
      name: 123,
    },
    data: {
      name: 2342,
    },
  });
};


// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
// export async function queryNotices() {
//   return request('/api/notices');
// }
