import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import './plugins/element.js'
import './style/public.less'
import 'nprogress/nprogress.css'
import AMap from 'vue-amap';
import {common} from "./until/wordBook";
// 注册全局方法
Vue.prototype.$until = common;
// 使用高德地图插件
Vue.use(AMap);
AMap.initAMapApiLoader({
    // 高德的key
    key: '42c570f662215af41c975a4b3f5952d8',
    // 插件集合 （插件按需引入）
    plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'CircleEditor'],
    // 高德 sdk 版本，默认为 1.4.4
    v: '1.4.4',
    uiVersion: '1.0.11' // 版本号
});

//按钮权限判断
Vue.prototype.buttonCheck = function (code) {
    return !!this.$route.meta.role.find(i => {
        return i.resCode == code
    });
};

Vue.config.productionTip = false;
let token = localStorage.getItem('token');
if (token) {
    store.dispatch('setToken', token)
}
new Vue({
    router: router,
    store,
    render: h => h(App)
}).$mount('#app');