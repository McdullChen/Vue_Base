import Vue from 'vue'
import Router from 'vue-router'
// 加载进度条
import NProgress from 'nprogress'

Vue.use(Router)
// 进度条配置项
NProgress.configure({ease: 'ease', speed: 500})

const createRouter = () => new Router({
    // 历史模式
    mode: 'history',
    routes: [
        // 主站重定向到login
        {
            path:'/',
            redirect:'/login'
        },
        // 登录页面路由
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login'),
            meta: {
                noLogin: true
            }
        },
    ]
});

const router = createRouter();

// 重置权限路由方法
export function resetRouter () {
    let  createRouter2 = () => new Router({
        routes: [{
            path: '/login',
            name: 'login',
            component: () => import('../views/login'),
            meta: {
                noLogin: true
            },
        }]
    });
    const newRouter = createRouter2();
    router.matcher = newRouter.matcher // the relevant part
}

router.beforeEach((to, from, next) => {
    if (to.path === `/login`) {
        return next()
    } else if (!localStorage.getItem('token')) {
        resetRouter();
        return next(`/login`)
    }
    // NProgress开始进度条
    NProgress.done();
    NProgress.start();
    next()
});

// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
    NProgress.done()
});

export default router
