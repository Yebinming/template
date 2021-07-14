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
      meta: { title: '首页', icon: 'home' }
    }]
  },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
export const asyncRouterMap = [
  {
    path:'/scoringSystem',
    component: Layout,
    redirect: '/scoringSystem/index',
    children:[
      {
        path:'index',
        component:()=>import('@/views/scoringSystem/index'),
        meta: { title: '学校管理', icon: 'home' },
      },
      {
        path:'/detail',
        component:()=>import('@/views/scoringSystem/detail'),
        meta: { title: '详情', icon: 'home' },
        hidden: true
      },
    ]
  },
  {
    path:'/authentication',
    component: Layout,
    redirect: '/authentication/index',
    children:[
      {
        path:'index',
        component:()=>import('@/views/authentication/index'),
        meta: { title: '认证资料管理', icon: 'home' },
      },
      {
        path:'/authentication/detail',
        component:()=>import('@/views/authentication/detail'),
        meta: { title: '详情', icon: 'home' },
        hidden: true
      },
    ]
  },
  {
    path:'/detailedrule',
    component: Layout,
    redirect: '/detailedrule/index',
    children:[
      {
        path:'index',
        component:()=>import('@/views/detailedrule/index'),
        meta: { title: '细则管理', icon: 'home' },
      },
      {
        path:'/authentication/detail',
        component:()=>import('@/views/detailedrule/detail'),
        meta: { title: '详情', icon: 'home' },
        hidden: true
      },
    ]
  },
  {
    path:'/targeted',
    component: Layout,
    redirect: '/targeted/index',
    children:[
      {
        path:'index',
        component:()=>import('@/views/targeted/index'),
        meta: { title: '评分细则管理', icon: 'home' },
      },
      {
        path:'targeted/detail',
        component:()=>import('@/views/targeted/detail'),
        meta: { title: '详情', icon: 'home' },
        hidden: true
      },
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/adminuser',
    meta: {
      title: '权限管理', icon: 'perm', 
    },
    children: [
      {
        path: 'adminuser',
        component: () => import('@/views/permission/adminuser/index'),
        meta: { title: '管理员', icon: 'perm',  }
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
        meta: { title: '角色管理', icon: 'perm',}
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
