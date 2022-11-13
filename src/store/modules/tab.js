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
    ]
}


const getters = {
    getIsCollapse(state) {
        return state.isCollapse
    },
    getTabsList(state) {
        return state.tabsList
    }
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
}

export default {
    state,
    mutations,
    getters,
    namespaced: true
}