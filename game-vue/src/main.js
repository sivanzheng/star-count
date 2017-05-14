import Vue from 'vue'
import App from './App'
import router from '@/router'
import '@/common/css/reset.less'
import '@/common/js/flexible'//引入flexible.js文件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
