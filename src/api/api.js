import request from '@/utils/request'
import { sha256_digest } from "@/utils/index";

            export function userCreate(data) {
                return request({
                    url: `/admin/user/create`,
                    method: 'post',
                    data: {
                        password:sha256_digest(data.password),
                        loginPhone:data.loginPhone,
                        headerImg:data.headerImg,
                        userName:data.userName,
                        libraryId:data.libraryId,
                      }
                })
            }
            export function adminuserCreate(data) {
                return request({
                    url: `/admin/adminuser/create`,
                    method: 'post',
                    data
                })
            }
            export function adminuserDelete(data) {
                return request({
                    url: `/admin/adminuser/delete`,
                    method: 'post',
                    data
                })
            }
            export function adminuserDisable(data) {
                return request({
                    url: `/admin/adminuser/disable`,
                    method: 'post',
                    data
                })
            }
            export function adminuserEnable(data) {
                return request({
                    url: `/admin/adminuser/enable`,
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
            export function adminuserGetAdminUserList(params) {
                return request({
                    url: `/admin/adminuser/getAdminUserList`,
                    method: 'get',
                    params
                })
            }
            export function adminuserUpdate(data) {
                return request({
                    url: `/admin/adminuser/update`,
                    method: 'post',
                    data
                })
            }
            export function librarylogssDelete(params) {
                return request({
                    url: `/admin/librarylogss/delete/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function librarylogssDetail(params) {
                return request({
                    url: `/admin/librarylogss/detail/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function librarylogssList(params) {
                return request({
                    url: `/admin/librarylogss/list`,
                    method: 'get',
                    params
                })
            }
            export function librarysCreate(data) {
                return request({
                    url: `/admin/librarys/create`,
                    method: 'post',
                    data
                })
            }
            export function librarysDetail(params) {
                return request({
                    url: `/admin/librarys/detail/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function librarysDelete(params) {
                return request({
                    url: `/admin/librarys/delete/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function librarysList(params) {
                return request({
                    url: `/admin/librarys/list`,
                    method: 'get',
                    params
                })
            }
            export function librarysLists(params) {
                return request({
                    url: `/admin/librarys/lists`,
                    method: 'get',
                    params
                })
            }
            export function librarysUpdate(data) {
                return request({
                    url: `/admin/librarys/update/${data.id}`,
                    method: 'post',
                    data
                })
            }
            export function loginlogssDelete(params) {
                return request({
                    url: `/admin/loginlogss/delete/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function loginlogssList(params) {
                return request({
                    url: `/admin/loginlogss/list`,
                    method: 'get',
                    params
                })
            }
            export function loginlogssListPid(params) {
                return request({
                    url: `/admin/loginlogss/listPid`,
                    method: 'get',
                    params
                })
            }
            export function passTrain(params) {
                return request({
                    url: `/admin/traininglogss/passTrain/${params.id}`,
                    method: 'post',
                    params
                })
            }
            export function mycenterGetLoginUser(params) {
                return request({
                    url: `/admin/mycenter/getLoginUser`,
                    method: 'get',
                    params
                })
            }
            export function mycenterUpdatePwd(data) {
                return request({
                    url: `/admin/mycenter/updatePwd`,
                    method: 'post',
                    data
                })
            }
            export function getTimeToDetermine(data) {
                return request({
                    url: `/admin/timetableuniforms/getTimeToDetermine`,
                    method: 'post',
                    data
                })
            }
            export function getTimeToDeterminePid(data) {
                return request({
                    url: `/admin/timetableuniforms/getTimeToDeterminePid`,
                    method: 'post',
                    data
                })
            }
            export function getTimeToDetermines(data) {
                return request({
                    url: `/admin/timetablespecials/getTimeToDetermine`,
                    method: 'post',
                    data
                })
            }
            export function getTimeToDeterminePids(data) {
                return request({
                    url: `/admin/timetablespecials/getTimeToDeterminePid`,
                    method: 'post',
                    data
                })
            }
            export function permissionAdd(data) {
                return request({
                    url: `/admin/permission/add`,
                    method: 'post',
                    data
                })
            }
            export function permissionGet(params) {
                return request({
                    url: `/admin/permission/get`,
                    method: 'get',
                    params
                })
            }
            export function permissionGetPermissionList(params) {
                return request({
                    url: `/admin/permission/getPermissionList`,
                    method: 'get',
                    params
                })
            }
            export function permissionUpdate(data) {
                return request({
                    url: `/admin/permission/update`,
                    method: 'post',
                    data
                })
            }
            export function UserAlllist(params) {
                return request({
                    url: `admin/user/list`,
                    method: 'get',
                    params
                })
            }
            export function systemLgos(params) {
                return request({
                    url: `admin/systemLgos`,
                    method: 'get',
                    params
                })
            }
            export function systemLgosDel(params) {
                return request({
                    url: `/admin/systemLgos/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function adminRole(params) {
                return request({
                    url: `/admin/role`,
                    method: 'get',
                    params
                })
            }
            export function roleCreate(data) {
                return request({
                    url: `/admin/role/create`,
                    method: 'post',
                    data
                })
            }
            export function roleDelete(data) {
                return request({
                    url: `/admin/role/delete`,
                    method: 'post',
                    data
                })
            }
            export function roleGet(params) {
                return request({
                    url: `/admin/role/get`,
                    method: 'get',
                    params
                })
            }
            export function roleUpdate(data) {
                return request({
                    url: `/admin/role/update`,
                    method: 'post',
                    data
                })
            }
            export function timetablespecialsCreate(data) {
                return request({
                    url: `/admin/timetablespecials/create`,
                    method: 'post',
                    data
                })
            }
            export function getTimetableUnispecialsList(params) {
                return request({
                    url: `/admin/timetablespecials/getTimetableUniformsList`,
                    method: 'get',
                    params
                })
            }
            export function specialsGetTimetable(params) {
                return request({
                    url: `/admin/timetablespecials/getTimetable`,
                    method: 'post',
                    params
                })
            }
            export function getTimetablespecialsGetPid(params) {
                return request({
                    url: `/admin/timetablespecials/getPid/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function getTimetablespecialsGet(params) {
                return request({
                    url: `/admin/timetablespecials/get${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function timetablespecialsDelete(params) {
                return request({
                    url: `/admin/timetablespecials/delete/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function timetablespecialsDeleteCourse(params) {
                return request({
                    url: `/admin/timetablespecials/deleteCourse/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function timetablespecialsUpdate(data) {
                return request({
                    url: `/admin/timetablespecials/update/${data.id}`,
                    method: 'post',
                    data
                })
            }
            export function timetableuniformsCreate(params) {
                return request({
                    url: `/admin/timetableuniforms/create`,
                    method: 'post',
                    params
                })
            }
            export function getTimetable(params) {
                return request({
                    url: `/admin/timetableuniforms/getTimetable`,
                    method: 'get',
                    params
                })
            }
            export function timetableuniformsDelete(params) {
                return request({
                    url: `/admin/timetableuniforms/delete/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function timetableuniformsDeleteCourse(params) {
                return request({
                    url: `/admin/timetableuniforms/deleteCourse/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function getTimetableUniformsList(params) {
                return request({
                    url: `/admin/timetableuniforms/getTimetableUniformsList`,
                    method: 'get',
                    params
                })
            }
            export function timetableuniformsUpdate(data) {
                return request({
                    url: `/admin/timetableuniforms/update/${data.id}`,
                    method: 'post',
                    data
                })
            }
            export function traininglogssList(params) {
                return request({
                    url: `/admin/traininglogss/List`,
                    method: 'get',
                    params
                })
            }
            export function timetableuniformsGet(params) {
                return request({
                    url: `/admin/timetableuniforms/get/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function timetableuniformsGetPid(params) {
                return request({
                    url: `/admin/timetableuniforms/getPid/${params.id}`,
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
            // 拒绝训练模式
            export function traininglogssDisableTrain(data) {
                return request({
                    url: `/admin/traininglogss/disableTrain/${data.id}`,
                    method: 'post',
                    data
                })
            }
            // 禁用训练模式
            export function traininglogssTurnTrain(data) {
                return request({
                    url: `/admin/traininglogss/turnTrain/${data.id}`,
                    method: 'post',
                    data
                })
            }
            // 启用训练模式
            export function traininglogssEnableTrain(params) {
                return request({
                    url: `/admin/traininglogss/enableTrain/${params.id}`,
                    method: 'get',
                    params
                })
            }
            
            export function traininglogssLogDetail(params) {
                return request({
                    url: `/admin/traininglogss/logDetail`,
                    method: 'get',
                    params
                })
            }
            export function userDisable(data) {
                return request({
                    url: `/admin/user/disable`,
                    method: 'post',
                    data
                })
            }
            export function userEnable(data) {
                return request({
                    url: `/admin/user/enable`,
                    method: 'post',
                    data
                })
            }
            export function userErrIgnore(data) {
                return request({
                    url: `/admin/user/errIgnore`,
                    method: 'post',
                    data
                })
            }
            export function userGet(params) {
                return request({
                    url: `/admin/user/get`,
                    method: 'get',
                    params
                })
            }
            export function userGetUserList(params) {
                return request({
                    url: `/admin/user/getUserList`,
                    method: 'get',
                    params
                })
            }
            export function userIsUnlock(data) {
                return request({
                    url: `/admin/user/isUnlock`,
                    method: 'post',
                    data
                })
            }
            export function userIsUpdate(data) {
                return request({
                    url: `/admin/user/isUpdate`,
                    method: 'post',
                    data
                })
            }
            export function userUserUpdate(data) {
                return request({
                    url: `/admin/user/userUpdate`,
                    method: 'post',
                    data
                })
            }
            export function videologssDelete(params) {
                return request({
                    url: `/admin/videologss/delete/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function videologssDetail(params) {
                return request({
                    url: `/admin/videologss/detail/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function videologssGetVideoLogsList(params) {
                return request({
                    url: `/admin/videologss/getVideoLogsList`,
                    method: 'get',
                    params
                })
            }
            export function getVideoLogsPid(params) {
                return request({
                    url: `/admin/videologss/getVideoLogsPid`,
                    method: 'get',
                    params
                })
            }
            export function videosCreate(data) {
                return request({
                    url: `/admin/videos/create`,
                    method: 'post',
                    data
                })
            }
            export function videosDelete(params) {
                return request({
                    url: `/admin/videos/delete/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function videosDetail(params) {
                return request({
                    url: `/admin/videos/detail/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function videosList(params) {
                return request({
                    url: `/admin/videos/list`,
                    method: 'get',
                    params
                })
            }
            export function videosLists(params) {
                return request({
                    url: `/admin/videos/lists`,
                    method: 'get',
                    params
                })
            }
            export function videosUpdate(data) {
                return request({
                    url: `/admin/videos/update/${data.id}`,
                    method: 'post',
                    data
                })
            }
            export function areaList(params) {
                return request({
                    url: `/base/address/area/list`,
                    method: 'get',
                    params
                })
            }
            export function areaNameList(data) {
                return request({
                    url: `/base/address/areaName/list`,
                    method: 'post',
                    data
                })
            }
            export function cityList(params) {
                return request({
                    url: `/base/address/city/list`,
                    method: 'get',
                    params
                })
            }
            export function lnglatList(data) {
                return request({
                    url: `/base/address/lnglat/list`,
                    method: 'post',
                    data
                })
            }
            export function provinceList(params) {
                return request({
                    url: `/base/address/province/list`,
                    method: 'get',
                    params
                })
            }
            export function baseSettingDetail(params) {
                return request({
                    url: `/base/baseSetting/detail`,
                    method: 'get',
                    params
                })
            }
            export function baseSettingSwitch(params) {
                return request({
                    url: `/base/baseSetting/switch`,
                    method: 'get',
                    params
                })
            }
            export function updateSwitch(data) {
                return request({
                    url: `/base/baseSetting/update/switch`,
                    method: 'post',
                    data
                })
            }
            export function downloadFileDownload(params) {
                return request({
                    url: `/base/download/fileDownload`,
                    method: 'get',
                    params
                })
            }
            export function excelDownload(params) {
                return request({
                    url: `/base/excel/download`,
                    method: 'get',
                    params
                })
            }
            export function excelDownloadFailedUsingJson(params) {
                return request({
                    url: `/base/excel/downloadFailedUsingJson`,
                    method: 'get',
                    params
                })
            }
            export function excelUpload(data) {
                return request({
                    url: `/base/excel/upload`,
                    method: 'post',
                    data
                })
            }
            export function initInitAccount(data) {
                return request({
                    url: `/base/init/initAccount`,
                    method: 'post',
                    data
                })
            }
            export function adminLogin(data) {
                return request({
                    url: `/base/login/admin/login`,
                    method: 'post',
                    data
                })
            }
            export function adminLogout(data) {
                return request({
                    url: `/base/login/admin/logout`,
                    method: 'post',
                    data
                })
            }
            export function adminVerify_login(data) {
                return request({
                    url: `/base/login/admin/verify_login`,
                    method: 'post',
                    data
                })
            }
            export function portalLogin(data) {
                return request({
                    url: `/base/login/portal/login`,
                    method: 'post',
                    data
                })
            }
            export function portalLogout(data) {
                return request({
                    url: `/base/login/portal/logout`,
                    method: 'post',
                    data
                })
            }
            export function portalSms(data) {
                return request({
                    url: `/base/login/portal/sms`,
                    method: 'post',
                    data
                })
            }
            export function portalVerify_login(data) {
                return request({
                    url: `/base/login/portal/verify_login`,
                    method: 'post',
                    data
                })
            }
            export function wxLogin(params) {
                return request({
                    url: `/base/login/wx/login`,
                    method: 'get',
                    params
                })
            }
            export function wxLogout(data) {
                return request({
                    url: `/base/login/wx/logout`,
                    method: 'post',
                    data
                })
            }
            export function wxVerify_login(data) {
                return request({
                    url: `/base/login/wx/verify_login`,
                    method: 'post',
                    data
                })
            }
            export function uploadUeditor_config(params) {
                return request({
                    url: `/base/upload/ueditor_config`,
                    method: 'get',
                    params
                })
            }
            export function uploadUeditor_uploadimage(data) {
                return request({
                    url: `/base/upload/ueditor_uploadimage`,
                    method: 'post',
                    data
                })
            }
            export function uploadUpload_image(data) {
                return request({
                    url: `/base/upload/upload_image`,
                    method: 'post',
                    data
                })
            }
            export function userAddUser(data) {
                return request({
                    url: `/base/user/addUser`,
                    method: 'post',
                    data
                })
            }
            export function userGetAdminUser(params) {
                return request({
                    url: `/base/user/getAdminUser`,
                    method: 'get',
                    params
                })
            }
            export function userGetUser(data) {
                return request({
                    url: `/base/user/getUser`,
                    method: 'post',
                    data
                })
            }
            export function verification_codeGet_image(params) {
                return request({
                    url: `/base/verification_code/get_image`,
                    method: 'get',
                    params
                })
            }
            export function jssdkconfigJssdk(params) {
                return request({
                    url: `/base/wx/jssdkconfig/jssdk`,
                    method: 'get',
                    params
                })
            }
            export function jssdkconfigPay(params) {
                return request({
                    url: `/base/wx/jssdkconfig/pay`,
                    method: 'get',
                    params
                })
            }
            export function jssdkconfigVoice(params) {
                return request({
                    url: `/base/wx/jssdkconfig/voice`,
                    method: 'get',
                    params
                })
            }
            export function traininglogssParentList(params) {
                return request({
                    url: `/admin/traininglogss/parentList`,
                    method: 'get',
                    params
                })
            }
            export function traininglogssSublevelList(params) {
                return request({
                    url: `/admin/traininglogss/sublevelList`,
                    method: 'get',
                    params
                })
            }
            export function traininglogssSublevelVideoList(params) {
                return request({
                    url: `/admin/traininglogss/sublevelVideoList`,
                    method: 'get',
                    params
                })
            }
            // 禁用分店训练模式
            export function traininglogssDisableTrainDeputy(params) {
                return request({
                    url: `/admin/traininglogss/disableTrainDeputy/${params.id}`,
                    method: 'post',
                    params
                })
            }
            // 启用分店训练模式
            export function traininglogssEnableTrainDeputy(params) {
                return request({
                    url: `/admin/traininglogss/enableTrainDeputy/${params.id}`,
                    method: 'post',
                    params
                })
            }
            export function TimetableBackupsCreate(params) {
                return request({
                    url: `/admin/TimetableBackups/create`,
                    method: 'post',
                    params
                })
            }
            export function TimetableBackupsDelete(params) {
                return request({
                    url: `/admin/TimetableBackups/delete/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function TimetableBackupsDetail(params) {
                return request({
                    url: `/admin/TimetableBackups/detail/${params.id}`,
                    method: 'get',
                    params
                })
            }
            export function TimetableBackupslList(params) {
                return request({
                    url: `/admin/TimetableBackups/list`,
                    method: 'get',
                    params
                })
            }
            export function TimetableBackupslUpdate(params) {
                return request({
                    url: `/admin/TimetableBackups/update/${params.id}`,
                    method: 'post',
                    params
                })
            }
  