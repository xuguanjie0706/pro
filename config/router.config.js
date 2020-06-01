export default [
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/user/login',
        component: '@/layouts/login/index',
        __isDynamic: true,
      },
      {
        path: '/applyingAgency/:inviteUid',
        component: '@/outPages/ApplyingAgency/index',
        __isDynamic: true,
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        // authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/dashboard/index',
          },
          {
            path: '/dashboard',
            name: '概览',
            icon: "AppstoreOutlined",
            authority: ['1', '5'],
            routes: [
              {
                name: '数据概览',
                path: 'index',
                icon: "",
                component: '@/pages/dataView/index',
                __isDynamic: true,

              },
            ],
          },
          {
            path: '/agent',
            name: '代理',
            icon: "SolutionOutlined",
            authority: ['1', '5', "6", "7"],
            routes: [
              {
                name: '代理商',
                path: 'agentPeople',
                icon: "",
                component: '@/pages/agentPeople/index',
                __isDynamic: true,
                authority: ['1', '5', "6", "7"],
              },
              {
                name: '推广',
                path: 'extension',
                icon: "",
                component: '@/pages/extensionView/index',
                __isDynamic: true,
                authority: ['1', '5', "6", "7"],
              },
              {
                name: '权益划转',
                path: 'transferEquity',
                icon: "",
                component: '@/pages/TransferEquity/index',
                __isDynamic: true,
                authority: ['1', '5'],
              },
            ],
          },
          {
            path: 'rights',
            icon: 'CreditCardOutlined',
            name: '权益',
            authority: ['1', '5'],
            routes: [
              {
                name: '批量分发',
                path: 'distribute',
                icon: "",
                component: '@/pages/distributeView/index',
                __isDynamic: true,
              },
              {
                name: '分发记录',
                path: 'sendRecord',
                icon: "",
                component: '@/pages/sendRecord/index',
                __isDynamic: true,
              },
              {
                name: '代理人',
                icon: "",
                path: 'cardSenderManage',
                component: '@/pages/cardSenderManage/index',
                __isDynamic: true,
              },
              {
                name: '代理人详情',
                icon: "",
                path: 'cardSenderDetail',
                component: '@/pages/cardSenderDetail/index',
                hideInMenu: true,
                __isDynamic: true,
              },
            ],
          },
          {
            path: 'user',
            name: '用户',
            icon: 'UserOutlined',
            authority: ['1', '5'],
            routes: [
              {
                name: '用户管理',
                icon: "",
                path: 'userManage',
                component: '@/pages/userManage/index',
                __isDynamic: true,
              },
            ],
          },
          // {
          //   path: '/demo',
          //   name: 'demo',
          //   icon: 'smile',
          //   routes: [
          //     {
          //       path: '/demo/a',
          //       name: 'a',
          //       icon: 'smile',
          //       component: '@/testPages/demo/a',
          //     },
          //     {
          //       path: '/demo/index',
          //       name: 'b',
          //       icon: 'smile',
          //       component: '@/testPages/demo/index',
          //     },
          //     {
          //       path: '/demo/c',
          //       name: 'c',
          //       icon: 'smile',
          //       component: '@/testPages/demo/c',
          //     },
          //   ],
          // },
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
          // {
          //   name: 'list.table-list',
          //   icon: 'table',
          //   path: '/list',
          //   component: './ListTableList',
          // },
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
