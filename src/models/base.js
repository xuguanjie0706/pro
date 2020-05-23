import api from '@/api';

const Model = {
  namespace: 'base',
  state: {
    pkgList: [],
    groupList: [],
    groupOtherList: [],
    tagList: [],
    tagOtherList: [],
  },
  effects: {
    *getPkgList({ payload }, { select, call, put }) {
      const pkgList = yield select(({ base }) => base.pkgList);
      if (pkgList.length === 0) {
        const response = yield call(api.cdkey.pkgList, payload);
        yield put({
          type: 'changeBaseData',
          payload: response,
          key: 'pkgList',
        });
      }
    },
    *getGroupList({ payload }, { select, call, put }) {
      const groupList = yield select(({ base }) => base.groupList);
      if (groupList.length === 0) {
        const response = yield call(api.group.List, payload);
        yield put({
          type: 'changeBaseData',
          payload: response,
          key: payload.type === 1 ? 'groupList' : 'otherGroupList',
        });
      }
    },
    *getTagList({ payload }, { select, call, put }) {
      const tagList = yield select(({ base }) => base.tagList);
      if (tagList.length === 0) {
        const response = yield call(api.tag.List, payload);
        yield put({
          type: 'changeBaseData',
          payload: response,
          key: payload.type === 2 ? 'tagList' : 'tagOtherList',
        });
      }
    },
    *addGroup({ payload }, { call, put }) {
      yield call(api.group.Save, payload);
      const response = yield call(api.group.List, { type: payload.type });
      yield put({
        type: 'changeBaseData',
        payload: response,
        key: payload.type === 1 ? 'groupList' : 'otherGroupList',
      });
      return response;
    },
    *addTag({ payload }, { call, put }) {
      const d = yield call(api.tag.Save, payload);
      const response = yield call(api.tag.List, { type: payload.type });
      yield put({
        type: 'changeBaseData',
        payload: response,
        key: payload.type === 2 ? 'tagList' : 'tagOtherList',
      });
      return d;
    },
  },
  reducers: {
    changeBaseData(state, { payload, key }) {
      return { ...state, [key]: payload };
    },
  },
};
export default Model;
