import Cookies from "js-cookie"

const state = {
    isCollapse: false, // 控制左侧菜单打开或收起,
    tabsList: [ // 面包屑数据
        {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
        },
    ],
    menu: [], // 左侧菜单栏
}


const getters = {
    getIsCollapse(state) {
        return state.isCollapse
    },
    getTabsList(state) {
        return state.tabsList
    },
    getMenu (state) {
        return state.menu
    },
}

const mutations = {
    collapseMenu(state) {
        console.log(state.isCollapse)
        state.isCollapse = !state.isCollapse
    },
    // 更新面包屑数据
    selectMenu(state, val) {
        if (val.name !== 'home') {
            const index = state.tabsList.findIndex(item => {
                return item.name === val.name
            })
            if (index === -1) {
                state.tabsList.push(val)
            }
        }
    },
    closeTag(state, item) {
        const index = state.tabsList.findIndex((val) => { return val.name === item.name })
        state.tabsList.splice(index, 1)
    },
    setMenu (state, menu) {
        Cookies.set('menu', JSON.stringify(menu))
        state.menu = menu
    },
    addMenu (state, router) {
        if (!Cookies.get('menu')) return
        const menu = JSON.parse(Cookies.get('menu'))
        state.menu = menu
        const menuArray = []
        menu.forEach(item => {
            if (item.children) {
                item.children = item.children.map(item => {
                    item.component = () => import(`../../views/${item.url}`)
                    return item
                })
                menuArray.push(...item.children)
            } else {
                item.component = () => import(`../../views/${item.url}`)
                menuArray.push(item)
            }
            // 路由动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        });
    },
}

export default {
    state,
    mutations,
    getters,
    namespaced: true
}