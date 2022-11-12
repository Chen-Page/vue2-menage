import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Home from "../views/Home.vue"
import User from "../views/User.vue"
import Main from "../views/Main.vue"

// 1.创建路由组件
// 2.将路由和组件映射
// 3.创建router实例

const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        children: [
            {
                path: 'home',
                component: Home
            },
            {
                path: 'user',
                component: User
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router