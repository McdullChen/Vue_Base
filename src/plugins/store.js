import Vue from 'vue'
import Vuex from 'vuex'
import {menuPath} from "../until/menuList";
import Router from './router'
// 递归获得树形方法
let getChildren = function (obj, data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].parentId === obj.resId) {
            data[i].del = true;
            data[i].children = getChildren(data[i], data);
            arr.push(data[i])
        }
    }
    return arr
};
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        // 菜单
        menuList: [],
        token: '',
        // 角色列表
        setRoleList: [],
        // 角色
        role: localStorage.getItem('roleId'),
        // 用户详情
        user:'',
        // 缓存队列
        include: 'menu',
        // 字典缓存
        wordBook:{},
        // 页面标签
        tabsList: [{label: '首页', noDel: true, name: 'index',path:'/home/index'}]
    },
    mutations: {
        // user存储
        setUser(state, data) {
            localStorage.setItem('userDetail',JSON.stringify(data));
            state.user = data;
        },
        // 字典存储
        setWordBook(state,data){
            state.wordBook[data.name] = data.list;
        },
        // 菜单初始化
        setMenu(state, data) {
            let menuTree = [];
            let homeRouter = {
                path: '/home',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */ '../components/home'),
                redirect: '/home/index',
                children: [
                    {
                        path: '/home/index',
                        name: 'index',
                        component: () => import('../views/index'),
                        meta: {
                            noLogin: true,
                            label: '首页',
                        },
                    },
                    {
                        path: '/home/*',
                        name: 'error',
                        component: () => import('../views/error'),
                        meta: {
                            noLogin: true,
                            label: '错误',
                        },
                    }
                ],
                meta: {
                    label: '首页'
                }
            };
            // 按照菜单层级排序以防后台排序错乱
            data.sort((a, b) => a.resLevel - b.resLevel);
            // 循环遍历菜单列表
            for (let i = 0; i < data.length; i++) {
                // 处理没被处理加载过的对象
                if (!data[i].del) {
                    let thisMenu = data[i];
                    // 获取子项
                    thisMenu.children = getChildren(data[i], data);
                    // 如果是顶层菜单
                    if (data[i].resType == 1 && data[i].parentId == 0) {
                        let router = {
                            path: data[i].resUrl,
                            name: data[i].resCode,
                            component: () => menuPath[data[i].resCode],
                            meta: {
                                label: data[i].resName,
                                urlId: data[i].resId,
                                role: thisMenu.children
                            }
                        };
                        router.children = [];
                        // 递归创建层级路由
                        let getMenu = function (data, index) {
                            if (data.resType === 2) {
                                let itemRouter = {
                                    path: data.resUrl,
                                    name: data.resCode,
                                    component: () => menuPath[data.resCode],
                                    meta: {
                                        label: data.resName,
                                        urlId: data.resId,
                                        role: data.children
                                    }
                                };
                                if (index === 0 && data.parentId === router.meta.urlId) {
                                    router.redirect = data.resUrl;
                                }
                                router.children.push(itemRouter)
                            } else if (data.resType === 1) {
                                data.children.forEach((x, i) => {
                                    getMenu(x, i)
                                })
                            }
                        };
                        thisMenu.children.forEach((i, index) => {
                            getMenu(i, index);
                        });
                        // 从头插入
                        homeRouter.children.unshift(router)
                        menuTree.push(thisMenu)
                    }else if (data[i].parentId == 0 && data[i].resType == 2) {
                        let router = {
                            path: data[i].resUrl,
                            name: data[i].resCode,
                            component: () => menuPath[data[i].resCode],
                            meta: {
                                label: data[i].resName,
                                urlId: data[i].resId,
                                role: thisMenu.children
                            }
                        };
                        homeRouter.children.unshift(router)
                    }

                }
            }
            Router.addRoutes([homeRouter]);//调用add;
            state.menuList = menuTree;
        },
        // 设置角色列表，并默认第一个角色为当前角色
        setRoleList(state, data) {
            state.setRoleList = data;
            if(!state.role){
                state.role = data[0].roleId;
                localStorage.setItem('roleId', data[0].roleId)
            }
        },
        // 设置当前角色
        setRoleId(state, data) {
            state.role = data;
            localStorage.setItem('roleId', data)
        },
        // 设置token
        setToken(state, data) {
            localStorage.setItem('token', data);
            state.token = data;
        },
        // 页面标签移除方法
        removeTabs(state, data) {
            let i = state.tabsList.findIndex(item => item.path === data);
            state.tabsList.splice(i, 1);
            let arr = [];
            state.tabsList.forEach(i => {
                arr.push(i.name + 'Page')
            });
            state.include = arr.join(',')
        },
        // 添加页面标签方法
        addTabsList(state, data) {
            if (!state.tabsList.find(i => {
                return i.name === data.name
            })) {
                state.tabsList.push(data);
            }else if(!state.tabsList.find(i => {
                return i.path === data.path
            })){
                state.tabsList.find(i => {
                    return i.name === data.name
                }).path = data.path
            }
            Router.push({path: data.path});
            let arr = [];
            state.tabsList.forEach(i => {
                arr.push(i.name + 'Page')
            });
            state.include = arr.join(',')
        }
    },
    actions: {
        setMenu({commit}, data) {
            commit('setMenu', data)
        },
        setUser({commit}, data) {
            commit('setUser', data)
        },
        removeTabs({commit}, data) {
            commit('removeTabs', data)
        },
        setRoleList({commit}, data) {
            commit('setRoleList', data)
        },
        addTabsList({commit}, data) {
            commit('addTabsList', data)
        },
        setRoleId({commit}, data) {
            commit('setRoleId', data)
        },
        setToken({commit}, data) {
            commit('setToken', data)
        },
        setWordBook({commit},data){
            commit('setWordBook', data)
        }
    }
})
