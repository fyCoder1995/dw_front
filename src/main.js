import '@/assets/styles/global.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
Vue.use(Element)

Vue.config.productionTip = false

import '@/router/permission'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
