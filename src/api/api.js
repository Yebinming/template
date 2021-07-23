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
export function traininglogssDelete(params) {
    return request({
        url: `/admin/traininglogss/delete/${params.id}`,
        method: 'get',
        params
    })
}
export function traininglogssDetail(params) {
    return request({
        url: `/admin/traininglogss/detail/${params.id}`,
        method: 'get',
        params
    })
}
export function List(params) {
    return request({
        url: `/admin/traininglogss/List`,
        method: 'get',
        params
    })
}
export function DisableTrain(params) {
    return request({
        url: `/admin/traininglogss/disableTrain/${params.id}`,
        method: 'get',
        params
    })
}
export function logDetail(params) {
    return request({
        url: `/admin/traininglogss/logDetail/${params.id}`,
        method: 'get',
        params
    })
}
export function enableTrain(params) {
    return request({
        url: `/admin/traininglogss/enableTrain/${params.id}`,
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
export function getAdminUserUpdate(params) {
    return request({
        url: `/admin/adminuser/update`,
        method: 'post',
        params
    })
}
// export function adminuserGet(params) {
//     return request({
//         url: `/admin/adminuser/get`,
//         method: 'get',
//         params
//     })
// }
export function adminuserDelete(params) {
    return request({
        url: `/admin/adminuser/delete/${params.id}`,
        method: 'post',
        params
    })
}
export function getUserList(params) {
    return request({
        url: `/admin/user/getUserList`,
        method: 'get',
        params
    })
}
export function enable(params) {
    return request({
        url: `/admin/user/enable`,
        method: 'post',
        params
    })
}
export function disable(params) {
    return request({
        url: `/admin/user/disable`,
        method: 'post',
        params
    })
}

