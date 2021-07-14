import { sha256_digest } from '@/utils'
import request from '@/utils/request'

export function adminuserCreate(params) {
  console.log(params,"params");
  return request({
    url: `/admin/adminuser/create`,
    method: 'post',
    params: {
      ...params,
      password:params.password ? sha256_digest(params.password) : '',
    }

  })
}
export function adminuserDelete(params) {
  return request({
    url: `/admin/adminuser/delete`,
    method: 'post',
    params
  })
}
export function adminuserDisable(params) {
  return request({
    url: `/admin/adminuser/disable`,
    method: 'post',
    params
  })
}
export function adminuserEnable(params) {
  return request({
    url: `/admin/adminuser/enable`,
    method: 'post',
    params
  })
}
export function adminuserGet(params) {
  return request({
    url: `/admin/adminuser/get`,
    method: 'get',
    params
  })
}
export function getAdminUserList(params) {
  return request({
    url: `/admin/adminuser/getAdminUserList`,
    method: 'get',
    params
  })
}
// export function adminuserUpdate(params) {
//   return request({
//     url: `/admin/adminuser/update`,
//     method: 'post',
//     params: {
//       ...params,
//       password:params.password ? sha256_digest(params.password) : '',
//       roleCode: params.role ? params.role[0].code : '',
//     }
//   })
// }
export function adminuserUpdate(params) {
  return request({
    url: `/admin/adminuser/update`,
    method: 'post',
    params: {
      ...params,
      password:params.password ? sha256_digest(params.password) : '',
    }
  })
}


export function roleCreate(params) {
  return request({
    url: `/admin/role/create`,
    method: 'post',
    params: {
      ...params,
      permission: params.permission.length ? params.permission.join(',') : null,
    }
  })
}
export function roleDelete(params) {
  return request({
    url: `/admin/role/delete`,
    method: 'post',
    params
  })
}
export function roleGet(params) {
  return request({
    url: `/admin/role/get`,
    method: 'get',
    params
  })
}
export function roleList(params) {
  return request({
    url: `/admin/role`,
    method: 'get',
    params
  })
}
export function roleUpdate(params) {
  return request({
    url: `/admin/role/update`,
    method: 'post',
    params: {
      ...params,
      permission: params.permission.length ? params.permission.join(',') : null,
    }
  })
}

export function permissionAdd(params) {
  return request({
    url: `/admin/permission/add`,
    method: 'post',
    params
  })
}
export function permissionDel(params) {
  return request({
    url: `/admin/permission/del/{id}`,
    method: 'post',
    params
  })
}
export function permissionGet(params) {
  return request({
    url: `/admin/permission/get`,
    method: 'get',
    params
  })
}
export function getPermissionList(params) {
  return request({
    url: `/admin/permission/getPermissionList`,
    method: 'get',
    params
  })
}
export function permissionUpdate(params) {
  return request({
    url: `/admin/permission/update`,
    method: 'post',
    params
  })
}
export function department(id) {
  return request({
    url: '/admin/department/tree/'+id,
    method: 'get',
  })
}
export function adminuserAll(params) {
  return request({
    url: '/admin/adminuser/all',
    method: 'get',
    params
  })
}
