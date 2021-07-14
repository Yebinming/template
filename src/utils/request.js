import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router/index.js'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,//规定要写的
  timeout: 20000 // request timeout请求时间
})
//添加请求拦截器
service.interceptors.request.use( 
  config => {
    if (config.method == 'post' && config.data) {
      let form = new FormData()
      Object.keys(config.data).forEach(v => {
        form.append(v, config.data[v])
      })
      config.data = form
    }
    if (store.getters.token) {
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//添加响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.errorCode !== 0) {//--请求发送的时候
      if (res.errorCode === 2) {//响应头被用户接收的时候
        Message({
          message: '请重新登录',
          type: 'error',
          duration: 5 * 1000
        })
        store.dispatch('user/resetToken').then(() => {
          // 为了重新实例化vue-router对象 避免bug
          location.reload()
        })
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
