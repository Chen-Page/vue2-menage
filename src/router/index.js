import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Home from "../views/Home.vue"
import User from "../views/User.vue"
import Main from "../views/Main.vue"
import Mall from "../views/Mall.vue"
import PageOne from "../views/PageOne.vue"
import PageTwo from "../views/PageTwo.vue"

// 1.创建路由组件
// 2.将路由和组件映射
// 3.创建router实例

const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: 'home', // 首页
                component: Home
            },
            {
                path: 'user', // 用户管理
                component: User
            },
            {
                path: 'mall', // 商品管理
                component: Mall
            },
            {
                path: 'page1', // 页面1
                component: PageOne,
            },
            {
                path: 'page2', // 页面2
                component: PageTwo,
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router