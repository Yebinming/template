import request from '@/utils/request'
let url = process.env.VUE_APP_BASE_API

export let verification_codeGet_image = url + '/base/verification_code/get_image'

export function adminuserCreate(data) {
    return request({
        url: `/admin/adminuser/create`,
        method: 'post',
        data
    })
}
export function adminuserGet(params) {
    return request({
        url: `/admin/adminuser/get`,
        method: 'get',
        params
    })
}
export function schoolList(params) {
    return request({
        url: `/admin/school/list`,
        method: 'get',
        params
    })
}
export function schoolUpdate(params) {
    return request({
        url: `/admin/school/update/${params.id}`,
        method: 'post',
        params
    })
}
export function schoolDetail(params) {
    return request({
        url: `/admin/school/detail/${params.id}`,
        method: 'get',
        params
    })
}
export function schoolDel(params) {
    return request({
        url: `/admin/school/del/${params.id}`,
        method: 'post',
        params
    })
}
export function authenticationschoolAudit(params) {
    return request({
        url: `/admin/authenticationschool/audit/${params.id}`,
        method: 'post',
        params
    })
}
export function authenticationschoolDetail(params) {
    return request({
        url: `/admin/authenticationschool/detail/${params.id}`,
        method: 'get',
        params
    })
}
export function authenticationschoolList(params) {
    return request({
        url: `/admin/authenticationschool/list`,
        method: 'get',
        params
    })
}
export function targetedList(params) {
    return request({
        url: `/admin/targeted/list`,
        method: 'get',
        params
    })
}
export function targetedUpdate(params) {
    return request({
        url: `/admin/targeted/update`,
        method: 'post',
        params
    })
}
export function targetedDetail(params) {
    return request({
        url: `/admin/targeted/detail/${params.id}`,
        method: 'get',
        params
    })
}
export function targetedDel(params) {
    return request({
        url: `/admin/targeted/del/${params.id}`,
        method: 'post',
        params
    })
}
export function addTargetedType(params) {
    return request({
        url: `/admin/targeted/addTargetedType`,
        method: 'post',
        params
    })
}
export function addFirstTargeted(params) {
    return request({
        url: `/admin/targeted/addFirstTargeted`,
        method: 'post',
        params
    })
}
export function detailedruleList(params) {
    return request({
        url: `/admin/detailedrule/list`,
        method: 'get',
        params
    })
}
export function detailedruleUpdate(params) {
    return request({
        url: `/admin/detailedrule/update/${params.id}`,
        method: 'post',
        params
    })
}
export function detailedruleDetail(params) {
    return request({
        url: `/admin/detailedrule/detail/${params.id}`,
        method: 'get',
        params
    })
}
export function detailedruleDel(params) {
    return request({
        url: `/admin/detailedrule/del/${params.id}`,
        method: 'post',
        params
    })
}
export function detailedruleAdd(params) {
    return request({
        url: `/admin/detailedrule/add`,
        method: 'post',
        params
    })
}