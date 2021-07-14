import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie获取令牌
import getPageTitle from '@/utils/get-page-title'
// import { set } from 'core-js/fn/dict'

NProgress.configure({ showSpinner: false }) // NProgress配置


const whiteList = ['/login'] // 没有重定向白名单
// main.js
router.beforeEach((to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    // if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('user/getInfo').then(res => { // 拉取info
          const roles = res.permissionCodes;
          store.dispatch('permission/GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
      // if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      //   store.dispatch('GetInfo').then(res => { // 拉取user_info
      //     const roles = res.data.role;
      //     next();//resolve 钩子
      //   })
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
    }
  }
});



router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
