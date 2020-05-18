export default [
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/login',
        component: '@/layouts/login/index',
        __isDynamic: true,
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/demo',
          },
          {
            path: 'dashboard',
            name: '概览',
            //component: '@/pages/products/index',
            routes: [
              {
                name: '数据概览',
                path: 'index',
                component: '@/pages/dataView/index',
                __isDynamic: true,
              },
            ],
          },
          {
            path: '/demo',
            name: 'demo',
            icon: 'smile',
            // component: './demo',
            routes: [
              {
                path: '/demo/a',
                name: 'a',
                icon: 'smile',
                component: './demo/a',
              },
              {
                path: '/demo/b',
                name: 'b',
                icon: 'smile',
                component: './demo/b',
              },
            ],
          },
          // {
          //   path: '/welcome',
          //   name: 'welcome',
          //   icon: 'smile',
          //   component: './Welcome',
          // },
          // {
          //   path: '/admin',
          //   name: 'admin',
          //   icon: 'crown',
          //   component: './Admin',
          //   authority: ['admin'],
          //   routes: [
          //     {
          //       path: '/admin/sub-page',
          //       name: 'sub-page',
          //       icon: 'smile',
          //       component: './Welcome',
          //       authority: ['admin'],
          //     },
          //   ],
          // },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            component: './404',
          },

        ],
      },

      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
