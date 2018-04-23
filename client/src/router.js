import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AdminPage from './views/AdminPage.vue'
import AdminLogin from './views/AdminLogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage
    },
    {
      path: '/backdoor',
      name: 'backdoor',
      component: AdminLogin
    }
  ]
})
