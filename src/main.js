import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from './router';

// ui样式框架element-ui
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI)

// 按需引入element-ui
// import { Button } from 'element-ui'
// Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
