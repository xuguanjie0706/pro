// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import router from './router.config';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  history: {
    type: "hash"
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: router,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    // '@primary-color': '#1464E8',
    '@item-hover-bg': '#F3F7FF',
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: '微医通后台管理',
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: './',
    // publicPath: './',
  },
  // base: './',
  // publicPath: './',
  // 加速打包不进行babel
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
});
