// 系统内所有页面资源，对应后台资源code
export const menuPath = {
    // 一般案件处理
    //-------------------------系统-----------------------------
    "menu": import('../views/system/menu'),// 资源管理
    "xitong": import('../views/system'),// 系统管理
    "user": import('../views/human/user'),// 用户管理
    "role": import('../views/system/role'),// 角色管理
    "table": import('../views/system/table'),// 表字段
    "account": import('../views/system/account'),// 账号管理
    "organization": import('../views/system/organization'),// 组织机构
    "runConfig": import('../views/system/runConfig'),// 系统参数管理
    "dictionary": import('../views/system/dictionary'),// 数据字典

    // ----------------------用户管理------------------------
    "human":import('../views/human/index'),

};

let getChildren = function (obj, data, idName, parentId,flag) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i][parentId] === obj[idName]) {
            data[i].del = true;
            let sun = getChildren(data[i], data, idName, parentId,flag);
            if(!flag || sun.length > 0){
                data[i].children = sun;
            }
            arr.push(data[i])
        }
    }
    return arr
};

/**
*getTree
* @module
* @desc 列表转树形数据结构
* @author WangWei
* @date 2019/6/6
 * @param {Array} [arr]    - 数组队列
 * @param {String} [idName]    - 父节点中与子节点指向对应的属性名称 如子节点的parentId指向父节点的id 则该处填写'id'
 * @param {String} [parentId]    - 子节点中指向父节点的属性 名称 如子节点的parentId指向父节点的id 则该处填写'parentId'
 * @param {String} [order]    - 排序字段名
 * @param {Boolean} [flag]    - 是否去除最低级别的children对象
**/

export const getTree = function (arr, idName, parentId, order,flag) {
    let data = order ? arr.sort((a, b) => a[order] - b[order]) : arr;
    let menuTree = [];
    for (let i = 0; i < data.length; i++) {
        if (!data[i].del) {
            let thisMenu = data[i];
            let sun = getChildren(data[i], data, idName, parentId,flag);
            if(!flag || sun.length > 0){
                thisMenu.children = sun;
            }
            menuTree.push(thisMenu)
        }
    }
    return menuTree
};
