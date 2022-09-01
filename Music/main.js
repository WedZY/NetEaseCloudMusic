
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'

// 引入请求封装
Vue.use(uView)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()
// #endif