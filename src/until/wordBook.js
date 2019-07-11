
// 系统中静态的字典表管理
import store from "../plugins/store";
import {apiCommonDictionAry} from "../api/system";

// 字典缓存处理
export const common = {
    workBookApi: async function (name) {
        if (store.state.wordBook[name]){
            return store.state.wordBook[name]
        } else{
            await apiCommonDictionAry(name).then(res=>{
                let json = {name:name,list:res.dicList};
                store.commit('setWordBook',json);
            });
            return store.state.wordBook[name];
        }
    }
};
export const MENUTYPEWORD = {
    1: '模块',
    2: '菜单',
    3: '按钮'
};
export const PARTYTYPE = {
  1:'个人',
  2:'公司',
  3:'个体户'
};
export const YESORNO = {
    0: '否',
    1: '是',
};
export const IFSEX = {
    0: '女',
    1: '男'
};
export const isEffective = {
    0: '无效',
    1: '已生效',
    2: '待生效'
};
export const quotaStatus = {
    1: '入库',
    2: '已领用',
    3: '作废',
    4: '遗失'
};
export const doneStatus = {
    1: '未使用',
    2: '已使用',
    3: '已上缴，待确认',
    4: '已确认'
};

// 日期格式化 formatDate(time,'yyyy-MM-dd hh:mm:ss')
export function formatDate(date, fmt) {
    if(typeof date !== 'number'){
        date = Number(date)
    }
    if (date < 1){
        return ''
    } else{
        date = new Date(date);
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
            }
        }
        return fmt
    }

}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
