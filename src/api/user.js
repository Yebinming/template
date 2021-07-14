import request from '@/utils/request'
import { sha256_digest } from "@/utils/index";
export function login(data) { 
  return request({
    url: `base/login/admin/login`,
    method:'POST',
    data: {
      password:sha256_digest(data.password),
      loginName:data.loginName,
      verificationCode:data.verificationCode
    }
  });
}
export function getLoginUser() {
  return request({
    url: '/admin/mycenter/getLoginUser',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/base/login/portal/logout',
    method: 'post'
  })
}
export function verify_login() {
  return request({
    url: '/base/login/admin/verify_login',
    method: 'post'
  })
}