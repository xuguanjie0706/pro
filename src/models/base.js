import api from '@/api';

const Model = {
  namespace: 'base',
  state: {
    pkgList: []
  },
  effects: {
    *getPkgList({ payload }, { call, put }) {
      const response = yield call(api.cdkey.pkgList, payload);
      yield put({
        type: 'changeBasePkgList',
        payload: response,
      });
    },
  },
  reducers: {
    changeBasePkgList(state, { payload }) {
      return { ...state, pkgList: payload };
    }
  },
};
export default Model;
