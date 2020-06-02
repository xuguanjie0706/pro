/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/img/logo.png';
import logoSmall from '../assets/img/logo.svg';


const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);


/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    collapsed,
  } = props;
  /**
   * constructor
   */
  const initLoad = async () => {
    const info = await dispatch({
      type: 'login/userInfo',
    });
    // console.log(info, 12321);
    if ([7, 2].includes(info.role)) {
      history.push('../agent/agentPeople');
    }
  };


  useEffect(() => {
    console.log(props.isLogin);

    if (!props.isLogin) {
      initLoad();
    }
  }, []);


  /**
   * init variables
   */

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  const { formatMessage } = useIntl();
  // console.log(props.login);
  // console.log(props.isLogin);
  return (

    <ProLayout
      style={{ height: '100%' }}
      siderWidth={208}
      menuHeaderRender={() => (
        <Link to="/">
          <img src={collapsed ? logoSmall : logo} alt="" />
        </Link>
      )}
      // fixedHeader
      // fixSiderbar
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
            <span>{route.breadcrumbName}</span>
          );
      }}
      // footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      {props.isLogin &&
        < Authorized authority={authorized.authority} noMatch={noMatch}>
          {/* <Authorized authority={'user'} noMatch={noMatch}> */}
          {children}
        </Authorized>
      }
    </ProLayout >
  );
};

export default connect(({ global, login, settings }) => ({
  collapsed: global.collapsed,
  login: login.info,
  isLogin: login.status,
  settings,
}))(BasicLayout);
