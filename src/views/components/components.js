import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import axios from 'axios'
// import { sync } from 'vuex-router-sync'

import App from './app-components.vue'
import lazy from 'vue-lazy-component'
import XyPopup from 'tools/vue-popup/main'
import tip from 'tools/tip/main'
import { getCookie } from 'tools/client'
import store from 'Store/demo'

// 此处注册后可全局直接引入
Vue.component('el-global', require('components/ui/global.vue'))

Vue.use(VueRouter)
Vue.use(XyPopup)
Vue.use(tip)
// Vue.use(VueResource)
Vue.prototype.$http = axios
Vue.use(lazy)

const routes = [
  {
    path: '/components/',
    name: 'components',
    component: require('./views/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/components/drag',
    name: 'drag',
    component: require('./views/drag.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/components/its',
    name: 'its',
    component: require('./views/its.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/login',
    name: 'login'
  },
  {
    path: '*',
    component: require('Views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  let sessionId = getCookie('session')
  if (!!sessionId || !meta.user) {
    return next()
  } else {
    window.location.href = 'index.html#/login'
  }
})

module.exports = new Vue({
  el: '#page-components',
  router,
  store,
  ...App
})
