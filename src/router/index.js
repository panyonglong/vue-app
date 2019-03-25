import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './routes.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.ROUTER_BASE,
  routes: routes
})

// 页面刷新时，重新赋值给store
store.dispatch('getUser')

// 导航拦截器
router.beforeEach((to, from, next) => {
  let isLogin = 1
  next()
})

export default router
