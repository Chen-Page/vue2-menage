<template>
    <div id="component_aside">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
            <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name" @click="clickMenu(item)">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
                    <el-menu-item :index="subItem.name" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
import Cookies from 'js-cookie'

export default {
    name: 'component_aside',
    components: {

    },
    mixins: [],
    props: {

    },
    data() {
        return {
        }
    },
    computed: {
        // 没有子菜单
        noChildren() {
            return this.menuData.filter((item) => {
                return !item.children
            })
        },
        // 有子菜单
        hasChildren() {
            return this.menuData.filter((item) => {
                return item.children
            })
        },
        isCollapse() {
            console.log(this.$store)
            return this.$store.getters['tab/getIsCollapse']
        },
        menuData () {
            let menu = this.$store.getters['tab/getMenu']
            if (!menu || menu.length == 0) {
                menu = JSON.parse(Cookies.get('menu'))
                this.$store.commit('tab/setMenu', menu)
            }
            return menu
        },
    },
    watch: {

    },
    mounted() {

    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu (item) {
            console.log(item)
            // 当前页面路由与跳转路由不一致时允许跳转
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
                this.$router.push(item.path)
            }
            this.$store.commit('tab/selectMenu', item)
        },
    }
};
</script>
<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu{
    border-right: 0;
    height: 100vh;
    min-height: 100vh;
    h3{
        color: white;
        text-align: center;
        line-height: 48px;
        font-weight: 400;
        font-size: 16px;
    }
}
</style>