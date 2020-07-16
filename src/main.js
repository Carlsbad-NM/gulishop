import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import SliderLoop from '@/components/SliderLoop'
import '@/mock/mockServer'

// 这是为了测试接口请求函数
import * as API from '@/api'

Vue.config.productionTip = false

Vue.component('TypeNav', TypeNav)
Vue.component('SliderLoop', SliderLoop)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
