import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Cookies from "js-cookie";

// import Home from "../views/Home.vue"
// import User from "../views/User.vue"
import Main from "../views/Main.vue"
// import Mall from "../views/Mall.vue"
// import PageOne from "../views/PageOne.vue"
// import PageTwo from "../views/PageTwo.vue"
import login from "../views/login.vue"

// 1.创建路由组件
// 2.将路由和组件映射
// 3.创建router实例

const routes = [
    // 主路由
    {
        path: '/',
        name: 'Main',
        component: Main,
        redirect: '/home',
        children: [
            // {
            //     name: 'home',
            //     path: 'home', // 首页
            //     component: Home
            // },
            // {
            //     name: 'user',
            //     path: 'user', // 用户管理
            //     component: User
            // },
            // {
            //     name: 'mall',
            //     path: 'mall', // 商品管理
            //     component: Mall
            // },
            // {
            //     name: 'page1',
            //     path: 'page1', // 页面1
            //     component: PageOne,
            // },
            // {
            //     name: 'page2',
            //     path: 'page2', // 页面2
            //     component: PageTwo,
            // }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, form, next) => {
    const token = Cookies.get('token')
    // 不存在token跳转到登录页面
    if (!token && to.name !== 'login') {
        next({ name: 'login' })
    } else if (token && to.name === 'login') { // 存在token
        next({name: 'home'})
    } else {
        next()
    }
})

export default router