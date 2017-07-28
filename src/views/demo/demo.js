import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import axios from 'axios'
// import { sync } from 'vuex-router-sync'
import VueSocketIo from 'vue-socket.io'

import App from './app-demo.vue'
// import lazy from 'vue-lazy-component'
import { getCookie } from 'tools/client'
import store from 'Store/demo'

Vue.use(VueRouter)
Vue.use(VueSocketIo, 'http://192.168.0.200:3004')
// Vue.use(VueResource)
// Vue.use(lazy)
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios

const UserProfile = {
  template: '<div>children-1</div>'
}

const UserPosts = {
  template: '<div>children-2</div>'
}

const routes = [
  {
    path: '/',
    name: 'demo',
    component: require('./views/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/foo',
    name: 'demo-foo',
    component: require('./views/foo.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/bar',
    name: 'demo-bar',
    component: require('./views/bar.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/animation',
    name: 'demo-animation',
    component: require('./views/animation.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/params/:name/:age',
    name: 'params',
    component: require('./views/params.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: require('./views/vuex.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/socket',
    name: 'socket',
    component: require('./views/socket.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/nested',
    component: require('./views/nested.vue'),
    meta: {
      user: true
    },
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '1',
        component: UserProfile
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: '2',
        component: UserPosts
      }
    ]
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
  el: '#page-demo',
  router,
  store,
  ...App
})
