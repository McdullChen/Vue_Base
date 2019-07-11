/**
 * system api
 * @desc 系统功能API
 * @author 王伟
 * @date 2019年06月03日
 * @example 调用示例
 *      import { apiCommonLogin } from './system.js'
 *      apiCommonLogin(data).then(res=>{
 *          console.log(res)
 *       })
 **/
import Vue from "vue";
import {post,upload} from "../plugins/axios";

Vue.prototype.$post = post;
Vue.prototype.$upload = upload;

let SYSTEM_IP = window.webConfig.systemAPI;
export const seeImgApi = SYSTEM_IP + '/file/open/';
export const uploadUserApi = SYSTEM_IP + '/file/uploadsUser';
//-------------------------Common-------------------------

// 登录接口
const URL_COMMON_LOGIN = SYSTEM_IP + "/login";
export const apiCommonLogin = function (json) {
    return Vue.prototype.$post(URL_COMMON_LOGIN, json);
};
// 登录接口
const testURL = SYSTEM_IP + "/example/getHTMLInfo";
export const APItestURL = function (json) {
    return Vue.prototype.$post(testURL, json);
};
// 注销
const URL_COMMON_LOGOUT = SYSTEM_IP + "/logout";
export const apiCommonLogout = function (json) {
    return Vue.prototype.$post(URL_COMMON_LOGOUT, json);
};

// 获取区域
const URL_COMMON_GET_AREA = SYSTEM_IP + '/common/getArea/';
export const apiCommonGetArea = function (id) {
    return Vue.prototype.$post(URL_COMMON_GET_AREA + id);
};

// //查询部门
// const URL_COMMON_SEARCH_ORG = SYSTEM_IP + '/sysOrg/search';
// export const apiOrgSearch = function (json) {
//     return Vue.prototype.$post(URL_COMMON_SEARCH_ORG,json);
// };
// //查询员工
// const URL_COMMON_YUANGONG = SYSTEM_IP + '/sysAccount/search';
// export const apiSysAccountSearch = function (json) {
//     return Vue.prototype.$post(URL_COMMON_YUANGONG,json);
// };

// 刷新权限
const URL_COMMON_REFRESH_PERMISSION = SYSTEM_IP + "/getRoleResources";
export const apiCommonRefreshPermission = function () {
    return Vue.prototype.$post(URL_COMMON_REFRESH_PERMISSION);
};

// 根据组织获取用户列表 prop:orgId
const URL_COMMON_GET_USERS_BY_ORG = SYSTEM_IP + '/common/getPersonList/';
export const apiCommonGetUsersByOrg = function (id) {
    return Vue.prototype.$post(URL_COMMON_GET_USERS_BY_ORG + id);
};


//  字典接口
const URL_COMMON_DICTIONARY = SYSTEM_IP + '/common/getDict/';
export const apiCommonDictionAry = function (json) {
    return Vue.prototype.$post(URL_COMMON_DICTIONARY + json)
};

// -------------------------Menu-------------------------

// 获取菜单列表
const URL_MENU_SEARCH = SYSTEM_IP + "/resource/search";
export const apiMenuSearch = function (json) {
    return Vue.prototype.$post(URL_MENU_SEARCH, json);
};

// 添加菜单
const URL_MENU_ADD = SYSTEM_IP + "/resource/add";
export const apiMenuAdd = function (json) {
    return Vue.prototype.$post(URL_MENU_ADD, json);
};

// 编辑菜单
const URL_MENU_UPDATE = SYSTEM_IP + "/resource/update";
export const apiMenuUpdate = function (json) {
    return Vue.prototype.$post(URL_MENU_UPDATE, json);
};

// 删除菜单
const URL_MENU_DELETE = SYSTEM_IP + "/resource/delete/";
export const apiMenuDelete = function (id, json) {
    return Vue.prototype.$post(URL_MENU_DELETE + id, json);
};

// -------------------------Password-------------------------
//修改账号密码
const URL_PASSWORD_UPDATE = SYSTEM_IP + '/updateUserPwd';
export const apiPasswordUpdate = function (json) {
    return Vue.prototype.$post(URL_PASSWORD_UPDATE, json)
};

//检查账号登陆密码
const URL_PASSWORD_CHECK = SYSTEM_IP + '/checkUserPwd';
export const apiPasswordCheck = function (json) {
    return Vue.prototype.$post(URL_PASSWORD_CHECK, json)
};

// -------------------------Account-------------------------
// 获取账号列表
const URL_ACCOUNT_SEARCH = SYSTEM_IP + '/loginAccount/search';
export const apiAccountSearch = function (json) {
    return Vue.prototype.$post(URL_ACCOUNT_SEARCH, json)
};

// 获取账号详情
const URL_ACCOUNT_GET = SYSTEM_IP + '/loginAccount/get/';
export const apiAccountGet = function (id, json) {
    return Vue.prototype.$post(URL_ACCOUNT_GET + id, json)
};

// 获取账号角色信息
const URL_ACCOUNT_GET_ROLE = SYSTEM_IP + '/loginAccount/getUserRoleInfo/';
export const apiAccountGetRole = function (id) {
    return Vue.prototype.$post(URL_ACCOUNT_GET_ROLE + id)
};

// 新增账号
const URL_ACCOUNT_ADD = SYSTEM_IP + '/loginAccount/add';
export const apiAccountAdd = function (json) {
    return Vue.prototype.$post(URL_ACCOUNT_ADD, json)
};

// 修改账号列表
const URL_ACCOUNT_UPDATE = SYSTEM_IP + '/loginAccount/update';
export const apiAccountUpdate = function (json) {
    return Vue.prototype.$post(URL_ACCOUNT_UPDATE, json)
};

// 删除账号
const URL_ACCOUNT_DELETE = SYSTEM_IP + "/loginAccount/delete/";
export const apiAccountDelete = function (id, json) {
    return Vue.prototype.$post(URL_ACCOUNT_DELETE + id, json);
};

// 绑定人员
const URL_ACCOUNT_BIND_USER = SYSTEM_IP + "/loginAccount/relationUser";
export const apiAccountBindUser = function (json) {
    return Vue.prototype.$post(URL_ACCOUNT_BIND_USER, json);
};

// 检查账号是否重复
const URL_ACCOUNT_CHECK = SYSTEM_IP + '/loginAccount/checkLoginName/';
export const apiAccountCheck = function (loginName) {
    return Vue.prototype.$post(URL_ACCOUNT_CHECK + loginName)
};

// 批量删除账号
const URL_ACCOUNT_DELETE_BATCH = SYSTEM_IP + '/loginAccount/deleteBatch';
export const apiAccountDeleteBatch = function (json) {
    return Vue.prototype.$post(URL_ACCOUNT_DELETE_BATCH, json);
};

// -------------------------sysOrg-------------------------

// 组织机构详情
const URL_ORG_GET = SYSTEM_IP + '/sysOrg/get/';
export const apiOrgGet = function (id, json) {
    return Vue.prototype.$post(URL_ORG_GET + id, json)
};

// 组织机构搜索
const URL_ORG_SEARCH = SYSTEM_IP + '/sysOrg/search';
export const apiOrgSearch = function (json) {
    return Vue.prototype.$post(URL_ORG_SEARCH, json)
};

// 组织机构添加
const URL_ORG_ADD = SYSTEM_IP + '/sysOrg/add';
export const apiOrgAdd = function (json) {
    return Vue.prototype.$post(URL_ORG_ADD, json)
};

// 组织机构修改
const URL_ORG_UPDATE = SYSTEM_IP + '/sysOrg/update';
export const apiOrgUpdate = function (json) {
    return Vue.prototype.$post(URL_ORG_UPDATE, json)
};

// 组织机构删除
const URL_ORG_DELETE = SYSTEM_IP + '/sysOrg/delete/';
export const apiOrgDelete = function (id, json) {
    return Vue.prototype.$post(URL_ORG_DELETE + id, json)
};

// 获取部门所属角色和角色对应用户列表
const URL_ORG_USERS_GET = SYSTEM_IP + '/sysOrg/getOrgRoleUserList';
export const apiOrgGetUsers = function (json) {
    return Vue.prototype.$post(URL_ORG_USERS_GET, json);
};

// 添加部门所属角色和角色对应用户列表
const URL_ORG_ADD_ROLE = SYSTEM_IP + '/sysOrg/getSaveOrgRoleUser';
export const apiOrgAddRole = function (json) {
    return Vue.prototype.$post(URL_ORG_ADD_ROLE, json);
};

// 删除部门所属角色和角色对应用户列表
const URL_ORG_DELETE_ROLE = SYSTEM_IP + '/sysOrg/deleteOrgRoleUser/';
export const apiOrgDeleteRole = function (id) {
    return Vue.prototype.$post(URL_ORG_DELETE_ROLE + id);
};

// -------------------------Role-------------------------

// 角色搜索列表
const URL_ROLE_SEARCH = SYSTEM_IP + '/sysRole/search';
export const apiRoleSearch = function (json) {
    return Vue.prototype.$post(URL_ROLE_SEARCH, json)
};

// 角色添加
const URL_ROLE_ADD = SYSTEM_IP + '/sysRole/add';
export const apiRoleAdd = function (json) {
    return Vue.prototype.$post(URL_ROLE_ADD, json)
};

// 角色修改
const URL_ROLE_UPDATE = SYSTEM_IP + '/sysRole/update';
export const apiRoleUpdate = function (json) {
    return Vue.prototype.$post(URL_ROLE_UPDATE, json)
};

// 角色删除
const URL_ROLE_DELETE = SYSTEM_IP + '/sysRole/delete/';
export const apiRoleDelete = function (id, json) {
    return Vue.prototype.$post(URL_ROLE_DELETE + id, json)
};
// 用户角色关联
const URL_ROLE_GET_USERS = SYSTEM_IP + '/sysRole/getRoleUserList';
export const apiRoleGetUsers = function (json) {
    return Vue.prototype.$post(URL_ROLE_GET_USERS, json)
};
// 用户角色关联
const URL_ROLE_BIND_USERS = SYSTEM_IP + '/sysRole/relationUser/';
export const apiRoleBindUser = function (id,json) {
    return Vue.prototype.$post(URL_ROLE_BIND_USERS + id, json)
};
// 角色关联资源查询
const URL_ROLE_SEARCH_MENU = SYSTEM_IP + '/sysRole/getRoleResList';
export const apiRoleSearchMenu = function (json) {
    return Vue.prototype.$post(URL_ROLE_SEARCH_MENU, json)
};

// 角色资源关联
const URL_ROLE_BIND_MENU = SYSTEM_IP + '/sysRole/relationResources/';
export const apiRoleBindMenu = function (id,json) {
    return Vue.prototype.$post(URL_ROLE_BIND_MENU + id, json)
};
// 角色组织关联查询
const URL_ROLE_SEARCH_ORG = SYSTEM_IP + '/sysRole/getRoleOrgList';
export const apiRoleSearchOrg = function (json) {
    return Vue.prototype.$post(URL_ROLE_SEARCH_ORG, json)
};

// 角色组织关联
const URL_ROLE_BIND_ORG = SYSTEM_IP + '/sysRole/relationOrg/';
export const apiRoleBindOrg = function (id,json) {
    return Vue.prototype.$post(URL_ROLE_BIND_ORG + id, json)
};

// 角色案件类型关联查询
const URL_ROLE_SEARCH_CASE_TYPE = SYSTEM_IP + '/sysRole/relationCaseType';
export const apiRoleSearchCaseType = function (json) {
    return Vue.prototype.$post(URL_ROLE_SEARCH_CASE_TYPE, json)
};

// 敏感数据配置查询
const URL_ROLE_SEARCH_TABLE = SYSTEM_IP + '/sysRole/getRoleTableFieldList';
export const apiRoleSearchTable = function (json) {
    return Vue.prototype.$post(URL_ROLE_SEARCH_TABLE, json)
};
// // 敏感数据配置
// const sensitiveDataURL = SYSTEM_IP + '/sysRole/sensitiveData';
// export const sensitiveDataAPI = function (json) {
//     return Vue.prototype.$post(sensitiveDataURL, json)
// };

// 角色用户
const URL_ROLE_SEARCH_ACCOUNT = SYSTEM_IP + '/sysRole/getRoleLoginList';
export const apiRoleSearchAccount = function (json) {
    return Vue.prototype.$post(URL_ROLE_SEARCH_ACCOUNT, json)
};

// 角色菜单
const URL_ROLE_SEARCH_MENU_VIEW   = SYSTEM_IP + '/sysRole/getRoleMenuList';
export const apiRoleSearchMenuView = function (json) {
    return Vue.prototype.$post(URL_ROLE_SEARCH_MENU_VIEW  , json)
};

// 角色部门
const URL_ROLE_SEARCH_ORG_VIEW = SYSTEM_IP + '/sysRole/getRoleDepartList';
export const apiRoleSearchOrgView = function (json) {
    return Vue.prototype.$post(URL_ROLE_SEARCH_ORG_VIEW, json)
};

// 角色表字段
const URL_ROLE_SEARCH_TABLE_VIEW = SYSTEM_IP + '/sysRole/getRoleField';
export const apiRoleSearchTableView = function (json) {
    return Vue.prototype.$post(URL_ROLE_SEARCH_TABLE_VIEW, json)
};

// -------------------------user-------------------------
// 根据ID获取内容
const URL_USER_GET = SYSTEM_IP + '/sysAccount/get/';
export const apiUserGet = function (id, json) {
    return Vue.prototype.$post(URL_USER_GET + id, json)
};

// 人员搜索
const URL_USER_SEARCH = SYSTEM_IP + '/sysAccount/search';
export const apiUserSearch = function (json) {
    return Vue.prototype.$post(URL_USER_SEARCH, json)
};

// 人员添加
const URL_USER_ADD = SYSTEM_IP + '/sysAccount/add';
export const apiUserAdd = function (json) {
    return Vue.prototype.$post(URL_USER_ADD, json)
};

// 人员修改
const URL_USER_UPDATE = SYSTEM_IP + '/sysAccount/update';
export const apiUserUpdate = function (json) {
    return Vue.prototype.$post(URL_USER_UPDATE, json)
};

// 验证人员身份证是否重复
const URL_USER_CHECK = SYSTEM_IP + '/sysAccount/checkIdCardNum/';
export const apiUserCheck = function (id) {
    return Vue.prototype.$post(URL_USER_CHECK + id)
};

// 人员删除
const URL_USER_DELETE = SYSTEM_IP + '/sysAccount/delete/';
export const apiUserDelete = function (id, json) {
    return Vue.prototype.$post(URL_USER_DELETE + id, json)
};

// 人员批量删除
const URL_USER_DELETE_BATCH = SYSTEM_IP + '/sysAccount/deleteBatch';
export const apiUSerDeleteBatch = function (json) {
    return Vue.prototype.$post(URL_USER_DELETE_BATCH, json)
};

// -------------------------Table-------------------------

// 获取表列表
const URL_TABLE_SEARCH = SYSTEM_IP + '/sysDBTable/search';
export const apiTableSearch = function (json) {
    return Vue.prototype.$post(URL_TABLE_SEARCH, json)
};

// 获取表详情
const URL_TABLE_GET = SYSTEM_IP + '/sysDBTable/getField/';
export const apiTableGet = function (tableName, json) {
    return Vue.prototype.$post(URL_TABLE_GET + tableName, json)
};

// 新增表
const URL_TABLE_ADD = SYSTEM_IP + '/sysDBTable/add';
export const apiTableAdd = function (json) {
    return Vue.prototype.$post(URL_TABLE_ADD, json)
};

// 修改表列表
const URL_TABLE_UPDATE = SYSTEM_IP + '/sysDBTable/update';
export const apiTableUpdate = function (json) {
    return Vue.prototype.$post(URL_TABLE_UPDATE, json)
};

// 删除表
const URL_TABLE_DELETE = SYSTEM_IP + "/sysDBTable/delete/";
export const apiTableDelete = function (id, json) {
    return Vue.prototype.$post(URL_TABLE_DELETE + id, json);
};

// 敏感数据表字段新增
const URL_TABLE_ADD_FIELD = SYSTEM_IP + '/sysDBTable/addField';
export const apiTableAddField = function (json) {
    return Vue.prototype.$post(URL_TABLE_ADD_FIELD, json);
};

// 敏感数据表字段修改
const URL_TABLE_UPDATE_FIELD = SYSTEM_IP + '/sysDBTable/updateField';
export const apiTableUpdateField = function (json) {
    return Vue.prototype.$post(URL_TABLE_UPDATE_FIELD, json);
};

// 敏感数据表字段删除
const URL_TABLE_DELETE_FIELD = SYSTEM_IP + '/sysDBTable/deleteField/';
export const apiTableDeleteField = function (id, json) {
    return Vue.prototype.$post(URL_TABLE_DELETE_FIELD + id, json);
};


//--------------------------------Log----------------------------------

// 获取日志表
const URL_LOG_SEARCH = SYSTEM_IP + '/elasticSearch/search';
export const apiLogSearch = function (json) {
    return Vue.prototype.$post(URL_LOG_SEARCH, json)
};

// 查询日志详情
const URL_LOG_GET = SYSTEM_IP + '/elasticSearch/getSysOperationLog/';
export const apiLogGet = function (id, json) {
    return Vue.prototype.$post(URL_LOG_GET + id, json)
};

//-----------------------------Dictionary------------------------------------

// 搜索
const URL_DICTIONARY_SEARCH = SYSTEM_IP + '/sysDict/search ';
export const apiDictionarySearch = function (json) {
    return Vue.prototype.$post(URL_DICTIONARY_SEARCH, json)
};

// id查询详情
const URL_DICTIONARY_GET = SYSTEM_IP + '/sysDict/get/';
export const apiDictionaryGet = function (id, json) {
    return Vue.prototype.$post(URL_DICTIONARY_GET + id, json)
};

// 添加
const URL_DICTIONARY_ADD = SYSTEM_IP + '/sysDict/add';
export const apiDictionaryAdd = function (json) {
    return Vue.prototype.$post(URL_DICTIONARY_ADD, json)
};

// 修改
const URL_DICTIONARY_UPDATE = SYSTEM_IP + '/sysDict/update';
export const apiDictionaryUpdate = function (json) {
    return Vue.prototype.$post(URL_DICTIONARY_UPDATE, json)
};

// id删除
const URL_DICTIONARY_DELETE = SYSTEM_IP + '/sysDict/delete/';
export const apiDictionaryDelete = function (id, json) {
    return Vue.prototype.$post(URL_DICTIONARY_DELETE + id, json)
};

//-----------------------------系统参数管理------------------------------------

// 搜索
const runConfigSearchsearchURL = SYSTEM_IP + '/runConfig/search';
export const apirunConfigSearch = function (json) {
    return Vue.prototype.$post(runConfigSearchsearchURL, json)
};
// id查询详情
const runConfiggetURL = SYSTEM_IP + '/runConfig/get/';
export const apirunConfigGet = function (id, json) {
    return Vue.prototype.$post(runConfiggetURL + id, json)
};
// 添加
const runConfigaddURL = SYSTEM_IP + '/runConfig/add';
export const apirunConfigAdd = function (json) {
    return Vue.prototype.$post(runConfigaddURL, json)
};
// 修改
const runConfigupdateURL = SYSTEM_IP + '/runConfig/update';
export const apirunConfigUpdate = function (json) {
    return Vue.prototype.$post(runConfigupdateURL, json)
};
// id删除
const runConfigdeleteURL = SYSTEM_IP + '/runConfig/delect/';
export const apirunConfigDelete = function (id, json) {
    return Vue.prototype.$post(runConfigdeleteURL + id, json)
};

