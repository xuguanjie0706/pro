import { stringify } from 'querystring';
import { history } from 'umi';
// import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import api from '@/api';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    info: {}
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(api.base.loginByPwd, payload);
      yield put({
        type: 'changeLoginInfo',
        payload: response,
      }); // Login successfully
      if (response) {
        history.push('/dashboard/index');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
    changeLoginInfo(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return { ...state, info: payload };
    }
  },
};
export default Model;
