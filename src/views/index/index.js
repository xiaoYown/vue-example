import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import { sync } from 'vuex-router-sync' // 同步vuex与路由的状态

import {getCookie} from 'tools/client'

import App from './app-index.vue'
import store from 'Store/index'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {
    path: '/',
    component: require('Views/index/index.vue'),
    name: 'index',
    meta: {
      user: true
    }
  }, {
    path: '/login',
    component: require('components/login.vue'),
    name: 'login',
    meta: {
      user: false
    }
  }, {
    path: '*',
    component: require('Views/404.vue'),
    meta: {
      user: false
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  let sessionId = getCookie('session')
  if (sessionId) {
    return next()
  } else if (meta.user && path !== '/login') {
    return next({path: '/login'})
  }
  next()
})

module.exports = new Vue({
  el: '#page-home',
  router,
  store,
  ...App
})
