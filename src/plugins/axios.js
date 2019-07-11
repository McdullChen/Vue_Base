import axios from 'axios'
import router from './router'
import {resetRouter} from "./router";
import md5 from 'js-md5'
import store from './store'
import {Message} from 'element-ui';
// 设置超时时间
axios.defaults.timeout = 50000;
// key
let keyStr = 'longjin2019shanghai';
// 相对路径设置
axios.defaults.baseURL = '';
//http request 拦截器
axios.interceptors.request.use(
    config => {
        // 获取token

        config.headers.clientType = 0;
        const token = store.state.token;
        if (token) {
            config.headers.token = token
        }
        // 设置参数格式
        if (!config.headers['Content-Type'] ||  config.headers['Content-Type']  == 'application/json;charset=UTF-8') {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            if (token) {
                config.headers.token = token
            }
            // 鉴权参数设置
            let data = JSON.parse(JSON.stringify(config.data)) || {};
            let submitData = {};
            submitData.jsonstr = JSON.stringify(data);
            submitData.timestamp = Date.parse(new Date()).toString();
            if (config.url !== '/test/login') {
                submitData.webToken = md5(JSON.stringify(data) + keyStr);
                submitData.requestUrlId = router.app._route.meta.urlId;
                // 刷新权限requestUrlId
                if (config.url.indexOf('getRoleResources') > -1) {
                    submitData.requestUrlId = 'getRoleResources'
                }
                submitData.roleId = store.state.role;
            }
            config.data = submitData;

        }
        return config;
        // 添加token到headers
    },
    err => {
        return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        // window.local.href = response
        if (response.headers.token) {
            store.dispatch('setToken', response.headers.token)
        }
        if (response.data.statusCode !== '200' && response.data.statusCode !== '100' && response.data.statusCode !== '104') {
            if (response.data.statusCode === '102' || response.data.statusCode === '110') {
                localStorage.removeItem('token');
                resetRouter();
                router.replace({name: 'login'});
            }
            Message({
                message: response.data.statusMsg,
                type: 'error'
            });
        }
        return response;

    },
    error => {
        Message({
            message: error.response.status + " " + error.response.statusText,
            type: 'error'
        });
        return Promise.reject(error)
    }
);

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                if (response.data.statusCode === '200' || response.data.statusCode === '100' || response.data.statusCode === '104') {
                    resolve(response.data.resMap);
                } else {
                    reject(response.data)
                }
            }, err => {
                reject(err);
            })
    })
}

/**
 * 封装上传请求
 * @param url 请求地址
 * @param json 请求数据 包含file为名的文件数组
 * @param progress 进度条方法
 * @returns {Promise}
 */

export function upload(url,json,progress) {
    return new Promise((resolve,reject) => {
        // 新建form对象
        let formData = new FormData();
        let obj = {};
        for (let key in json){
            if (key == 'file'){
                json[key].forEach((i)=>{
                    // 将file数组拆分成多个form对象w
                    formData.append(key, i);
                })
            } else{
                // 其余参数放入obj待处理
                obj[key] = json[key]
            }
        }
        // 将obj参数按照权限加密生成需求的form对象
        formData.append('jsonstr',JSON.stringify(obj));
        formData.append('timestamp',Date.parse(new Date()).toString());
        formData.append('webToken',md5(JSON.stringify(obj) + keyStr));
        formData.append('requestUrlId',router.app._route.meta.urlId);
        // 请求
        axios.post(url,formData,{ headers: {
                'Content-Type': 'multipart/form-data'
            },timeout:10000000,
            // 上传进度回传
            onUploadProgress: progressEvent => {
                if(progress){
                    progress(progressEvent)
                }
            },
        }).then(response => {
            if (response.data.statusCode === '200' || response.data.statusCode === '100' || response.data.statusCode === '104') {
                resolve(response.data.resMap);
            } else {
                reject(response.data)
            }
        }) .catch(err => {
            reject(err);
        })
    })
}

