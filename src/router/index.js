import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // 文档隐藏
  {
    path: '/documentation',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  // 引导页隐藏
  {
    path: '/guide',
    component: Layout,
    hidden: true,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/page',
    alwaysShow: true, // will always show the root menu
    name: 'user',
    meta: {
      title: 'user',
      icon: 'peoples'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      { // 用户信息列表
        path: 'page',
        component: () => import('@/views/user/page'),
        name: 'PageUser',
        meta: {
          title: 'PageUser'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      { // 用户信息详情
        path: 'userDetail',
        component: () => import('@/views/user/component/userDetail'),
        name: 'userDetail', // 使用name参数,避免在URL中传参(安全)
        hidden: true,
        meta: {
          title: 'userDetail'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      { // 用户信息统计
        path: 'userStatistics',
        component: () => import('@/views/user/component/userStatistics'),
        name: 'userStatistics',
        meta: {
          title: 'userStatistics'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 党员管理
  {
    path: '/member',
    component: Layout,
    redirect: '/member/page',
    alwaysShow: true, // will always show the root menu
    name: 'member',
    meta: {
      title: 'member',
      icon: 'people'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/member/page'),
        name: 'PageMember',
        meta: {
          title: 'PageMember'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'member/:id',
        component: () => import('@/views/member/components/memberDetail'),
        name: 'memberDetail',
        meta: {
          title: 'memberDetail'
        },
        hidden:true      //eslint-disable-line
      },

      // {
      //   path: 'bar',
      //   component: () => import('@/views/member/bar'),
      //   name: 'barChart',
      //   meta: { title: 'bar', noCache: true }
      // },

      {
        path: 'mumChart',
        component: () => import('@/views/member/mumChart'),
        name: 'mumChart',
        meta: { title: 'mumChart', noCache: true }
      }
    ]
  },
  // 资讯管理
  {
    path: '/info',
    component: Layout,
    redirect: '/info/page',
    alwaysShow: true, // will always show the root menu
    name: 'info',
    meta: {
      title: 'info',
      icon: 'education'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/info/page'),
        name: 'info',
        meta: {
          title: 'infoList'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'chart',
        component: () => import('@/views/info/chart'),
        name: 'infoChart',
        meta: {
          title: '资讯图表'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'infoDetail',
        component: () => import('@/views/info/components/infoDetail'),
        name: 'infoDetail',
        meta: {
          title: '资讯详情'
        },
        hidden: true
      },
      {
        path: 'create',
        component: () => import('@/views/info/components/infoCreate'),
        name: 'infoCreate',
        meta: {
          title: '资讯新增'
        }
        // hidden: true
      }
    ]
  },
  // 通知管理
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/page',
    alwaysShow: true, // will always show the root menu
    name: 'notice',
    meta: {
      title: 'notice',
      icon: 'international'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      // 公告创建
      {
        path: 'noticeEst',
        component: () => import('@/views/notice/noticeEst'),
        name: 'noticeEst',
        meta: {
          title: 'noticeEst'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      // 公告管理
      {
        path: 'page',
        component: () => import('@/views/notice/page'),
        name: 'PageNotice',
        meta: {
          title: 'PageNotice'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      // 公告详情
      {
        path: 'noticeDetails',
        component: () => import('@/views/notice/noticeDetails'),
        name: 'noticeDetails',
        meta: {
          title: 'noticeDetails'
          // roles: ['admin'] // or you can only set roles in sub nav
        },
        hidden: true
      },
      // 公告图表
      {
        path: 'noticeCharts',
        component: () => import('@/views/notice/noticeCharts'),
        name: 'noticeCharts',
        meta: {
          title: 'noticeCharts'
          // roles: ['admin'] // or you can only set roles in sub nav
        },
        hidden: true
      }
    ]
  },
  // 会议管理
  {
    path: '/meeting',
    component: Layout,
    redirect: '/meeting/index',
    alwaysShow: true, // will always show the root menu
    name: 'meeting',
    meta: {
      title: 'meeting',
      icon: 'list'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/meeting/index'),
        name: 'meetingAdd',
        meta: {
          title: 'meetingAdd'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'meetingForm',
        component: () => import('@/views/meeting/components/meetingForm'),
        // hidden: true,
        name: 'Announcement',
        meta: { title: 'Announcement' }
      },
      {
        path: 'announcement',
        component: () => import('@/views/meeting/announcement'),
        name: '会议通知列表',
        meta: { title: '会议通知列表', roles: ['admin'] }
      },
      {
        path: 'meetingTotal',
        component: () => import('@/views/meeting/meetingTotal'),
        name: 'meetingTotal',
        meta: { title: 'meetingTotal', roles: ['admin'] },
        hidden: true
      }
    ]
  },
  // 活动管理
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/activityList',
    alwaysShow: true, // will always show the root menu
    name: 'activity',
    meta: {
      title: 'activity',
      icon: 'nested'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'activityList',
        component: () => import('@/views/activity/page'),
        name: 'PageActivity',
        meta: {
          title: 'PageActivity'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'activityDetail',
        component: () => import('@/views/activity/components/ActivityDetail'),
        name: '活动详情',
        hidden: true,
        meta: {
          title: '活动详情'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'activityNew',
        component: () => import('@/views/activity/components/ActivityNew'),
        name: '发起活动',
        meta: {
          title: '发起活动'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'activityChat',
        component: () => import('@/views/activity/components/ActivityChat'),
        name: '活动图表',
        meta: {
          title: '活动图表'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 经营管理
  {
    path: '/analysis',
    component: Layout,
    redirect: '/analysis/daily',
    alwaysShow: true, // will always show the root menu
    name: 'analysis',
    meta: {
      title: 'analysis',
      icon: 'eye-open'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'daily',
        component: () => import('@/views/analysis/daily'),
        name: 'DailyAnalysis',
        meta: {
          title: 'DailyAnalysis'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'dailyMap',
        component: () => import('@/views/analysis/dailyMap'),
        name: 'DailyMap',
        hidden: true,
        meta: {
          title: 'DailyMap'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'ice',
        component: () => import('@/views/analysis/ice'),
        name: 'IceAnalysis',
        meta: {
          title: 'IceAnalysis'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 产品管理
  {
    path: '/produce',
    component: Layout,
    redirect: '/produce/PageProduce',
    alwaysShow: true, // will always show the root menu
    name: 'produce',
    meta: {
      title: 'produce',
      icon: 'lock'
    },
    children: [
      {
        path: 'PageProduce',
        component: () => import('@/views/produce/components/PageProduce'),
        name: 'PageProduce',
        meta: {
          title: 'PageProduce'
        }
      },
      {
        path: 'ChartProduce',
        component: () => import('@/views/produce/components/ChartProduce'),
        name: 'ChartProduce',
        meta: { title: 'ChartProduce', noCache: true }
      },
      {
        path: 'ThingProduce',
        component: () => import('@/views/produce/components/thing'),
        name: 'ThingProduce',
        hidden: true,
        meta: {
          title: 'ThingProduce'
          //
        }
      }
    ]
  },
  // 内部人力资源市场Internal Human Resource Market
  {
    path: '/market',
    component: Layout,
    redirect: '/market/page',
    alwaysShow: true, // will always show the root menu
    name: 'market',
    meta: {
      title: 'market',
      icon: 'component'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/market/page'),
        name: 'PageMarket',
        meta: {
          title: 'PageMarket'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/market/detail'),
        name: 'PageDetail',
        hidden: true,
        meta: {
          title: 'PageDetail'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'jobMap',
        component: () => import('@/views/market/jobMap'),
        name: 'jobMap',
        meta: {
          title: 'jobMap',
          noCache: true
        }
      }
    ]
  },
  // 权限测试页
  {
    path: '/permission',
    component: Layout,
    hidden: true,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },
  // 图标隐藏
  {
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    hidden: true,
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },
  // tab
  {
    path: '/tab',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },
  // 错误日志
  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    name: 'ErrorPages',

    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    hidden: true,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    hidden: true,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },
  // pdf
  {
    path: '/pdf',
    component: Layout,
    hidden: true,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },
  // 换肤隐藏
  {
    path: '/theme',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },
  // clipboard
  {
    path: '/clipboard',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },
  // international
  {
    path: '/i18n',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },
  // 外联
  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
