let url = process.env.VUE_APP_BASE_API
const apiUrl = {
    uploadFileUrl: url + '/base/upload/upload_image',
    uploadimage: url + '/base/upload/ueditor_uploadimage',
}
// 出口默认apiUrl
export default {
    install(Vue, options) {
        Vue.prototype.$api = apiUrl
    },
}
