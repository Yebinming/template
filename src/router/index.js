import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
export const asyncRouterMap = [
  {
    path:'/loginLog',
    component: Layout,
    redirect: '/loginLog/index',
    children:[
      {
        path:'index',
        component:()=>import('@/views/loginLog/index'),
        meta: { title: '登录日志', icon: 'el-icon-s-flag' },
      },
      {
        path:'loginLog/detail',
        component:()=>import('@/views/loginLog/detail'),
        meta: { title: '详情', icon: 'el-icon-s-flag' },
        hidden: true
      },
    ]
  },
  {
    path:'/books',
    component: Layout,
    redirect: '/books/bookManagement',
    meta: {
      title: '图书管理', icon: 'el-icon-picture-outline-round', 
    },
    children:[
      {
        path:'bookManagement',
        component:()=>import('@/views/books/bookManagement/index'),
        meta: { title: '图书管理', icon: 'el-icon-picture-outline-round' },
      },
      {
        path:'bookManagement/detail',
        component:()=>import('@/views/books/bookManagement/detail'),
        meta: { title: '详情', icon: 'el-icon-picture-outline-round' },
        hidden: true
      },
      {
        path:'bookJournal',
        component:()=>import('@/views/books/bookJournal/index'),
        meta: { title: '图书日志', icon: 'el-icon-picture-outline-round' },
      },
      {
        path:'bookJournal/detail',
        component:()=>import('@/views/books/bookJournal/detail'),
        meta: { title: '详情', icon: 'el-icon-picture-outline-round' },
        hidden: true
      },
    ]
  },
  {
    path:'/curriculum',
    component: Layout,
    redirect: '/curriculum/commonly',
    meta: {
      title: '课程管理', icon: 'el-icon-s-order', 
    },
    children:[
      {
        path:'commonly',
        component:()=>import('@/views/curriculum/commonly/index'),
        meta: { title: '统一课表', icon: 'el-icon-s-order' },
      },
      {
        path:'commonly/list',
        component:()=>import('@/views/curriculum/commonly/list'),
        meta: { title: '新增', icon: 'el-icon-s-order' },
        hidden: true
      },
      {
        path:'commonly/detail',
        component:()=>import('@/views/curriculum/commonly/detail'),
        meta: { title: '详情', icon: 'el-icon-s-order' },
        hidden: true
      },
      {
        path:'special',
        component:()=>import('@/views/curriculum/special/index'),
        meta: { title: '特殊课表', icon: 'el-icon-s-order' },
      },
      {
        path:'special/list',
        component:()=>import('@/views/curriculum/special/list'),
        meta: { title: '新增', icon: 'el-icon-s-order' },
        hidden: true
      },
      {
        path:'special/detail',
        component:()=>import('@/views/curriculum/special/detail'),
        meta: { title: '详情', icon: 'el-icon-s-order' },
        hidden: true
      },
    ]
  },
  {
    path:'/video',
    component: Layout,
    redirect: '/video/commonly',
    meta: {
      title: '视频管理', icon: 'el-icon-video-camera', 
    },
    children:[
      {
        path:'curriculum',
        component:()=>import('@/views/video/curriculum/index'),
        meta: { title: '课程视频', icon: 'el-icon-video-camera' },
      },
      {
        path:'curriculum/detail',
        component:()=>import('@/views/video/curriculum/detail'),
        meta: { title: '详情', icon: 'el-icon-video-camera' },
        hidden: true
      },
      {
        path:'advertisement',
        component:()=>import('@/views/video/advertisement/index'),
        meta: { title: '广告视频', icon: 'el-icon-video-camera' },
      },
      {
        path:'advertisement/detail',
        component:()=>import('@/views/video/advertisement/detail'),
        meta: { title: '详情', icon: 'el-icon-video-camera' },
        hidden: true
      },
      {
        path:'journal',
        component:()=>import('@/views/video/journal/index'),
        meta: { title: '视频日志', icon: 'el-icon-video-camera' },
      },
      {
        path:'journal/detail',
        component:()=>import('@/views/video/journal/detail'),
        meta: { title: '详情', icon: 'el-icon-video-camera' },
        hidden: true
      },
    ]
  },


  
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/adminuser',
    meta: {
      title: '权限管理', icon: 'el-icon-user', 
    },
    children: [
      {
        path: 'adminuser',
        component: () => import('@/views/permission/adminuser/index'),
        meta: { title: '管理员', icon: 'el-icon-user',  }
      },
      {
        path: 'adminuser/detail',
        component: () => import('@/views/permission/adminuser/detail'),
        meta: { title: '用户详情' },
        hidden: true
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role/index'),
        meta: { title: '角色管理', icon: 'el-icon-user',}
      },
      {
        path: 'role/detail',
        component: () => import('@/views/permission/role/detail'),
        meta: { title: '角色详情' },
        hidden: true
      },
 
    ]
  },

  {
    path: '/changePassword',
    component: Layout,
    redirect: '/changePassword/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/changePassword/index'),
        meta: { title: '修改密码', icon: 'perm' },
        hidden: true
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
