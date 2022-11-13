import Vue from 'vue'
import App from './App.vue'

// 引入路由和store数据
import router from './router';
import store from './store'

// ui样式框架element-ui
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI)

// 按需引入element-ui
// import { Button } from 'element-ui'
// Vue.use(Button)

// 引入mockjs模拟数据
import './api/mock'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.commit('tab/addMenu', router)
  }
}).$mount('#app')
