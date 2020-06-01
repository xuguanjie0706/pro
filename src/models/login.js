import { stringify } from 'querystring';
import { history } from 'umi';
// import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import api from '@/api';
// import { ROLE_LIST } from '@/utils/enum';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    info: {
      role: null
    },
    role: null
  },
  effects: {
    *userInfo(_, { call, put }) {
      const response = yield call(api.user.userInfo);
      if (response) {
        yield put({
          type: 'changeLoginInfo',
          payload: response,
        }); // Login successfully
        // console.log(response);
        yield put({
          type: 'changeLoginStatus',
          payload: true,
          role: response.role.toString()
        });
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: false,
          role: '0'
        });
        history.replace({
          pathname: '/user/login',
        });
      }
      return response;
    },
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

    *loginOut(_, { put }) {
      // const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   history.replace({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   });
      // }
      yield put({
        type: 'changeLoginStatus',
        payload: false,
        role: '0'
      });
      history.replace({
        pathname: '/login',
      });
    },
  },
  reducers: {
    // changeLoginStatus(state, { payload }) {
    //   setAuthority(payload.currentAuthority);
    //   return { ...state, status: payload.status, type: payload.type };
    // },
    changeLoginInfo(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return { ...state, info: payload };
    },
    changeLoginStatus(state, { payload, role }) {
      setAuthority(role);
      return { ...state, status: payload, role };
    }
  },
};
export default Model;
