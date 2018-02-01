import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import axios from 'axios'
// import { sync } from 'vuex-router-sync'
// import VueSocketIo from 'vue-socket.io'
// import VueSocketIo from 'tools/vue-socket'
import tip from 'tools/tip/main'

import App from './app-demo.vue'
// import lazy from 'vue-lazy-component'
import { getCookie } from 'tools/client'
import store from 'Store/demo'

Vue.use(VueRouter)
Vue.use(tip)
// Vue.use(VueSocketIo, {
//   socketChat: 'http://192.168.0.222:3004',
//   socketTest: 'http://192.168.0.222:3005'
// })
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

var animation = r => require.ensure([], () => r(require('./views/animation.vue')), 'animation')
// const Animation = () => import('../views/animation.vue')
// const Animation = resolve => require.ensure(['../views/animation.vue'], resolve)
// const Animation = System.import('../views/animation.vue')
// function (resolve) {
//   这个特殊的 require 语法告诉 webpack
//   自动将编译后的代码分割成不同的块，
//   这些块将通过 Ajax 请求自动下载。
//   require(['./my-async-component'], resolve)
// }

const routes = [
  {
    path: '/demo',
    name: 'demo',
    component: require('./views/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/demo/foo',
    name: 'demo-foo',
    component: require('./views/foo.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/demo/bar',
    name: 'demo-bar',
    component: require('./views/bar.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/demo/animation',
    name: 'demo-animation',
    component: animation, // require('./views/animation.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/demo/params/:name/:age',
    name: 'params',
    component: require('./views/params.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/demo/vuex',
    name: 'vuex',
    component: require('./views/vuex.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/demo/socket',
    name: 'socket',
    component: require('./views/socket.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/demo/recursive',
    name: 'recursive',
    component: require('./views/recursive.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/demo/nested',
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
  el: '#page-demo',
  router,
  store,
  ...App
})
