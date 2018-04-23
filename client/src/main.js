import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import swal from 'sweetalert'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.prototype.$swal = swal

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
