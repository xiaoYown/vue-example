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
import 'core-js/fn/promise'
import store from 'Store/demo'

import ViewIndex from './views/index.vue'
import ViewFoo from './views/foo.vue'
import ViewBar from './views/bar.vue'
import ViewParams from './views/params.vue'
import ViewVuex from './views/vuex.vue'
import ViewSocket from './views/socket.vue'
import ViewRecursive from './views/recursive.vue'
import ViewNested from './views/nested.vue'
import NotFound from 'Views/404.vue'

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

var animation = resolve => require.ensure([], () => {
  resolve(require('./views/animation.vue').default)
}, 'animation')
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
    component: ViewIndex,
    meta: {
      user: true
    }
  },
  {
    path: '/demo/foo',
    name: 'demo-foo',
    component: ViewFoo,
    meta: {
      user: true
    }
  },
  {
    path: '/demo/bar',
    name: 'demo-bar',
    component: ViewBar,
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
    component: ViewParams,
    meta: {
      user: true
    }
  },
  {
    path: '/demo/vuex',
    name: 'vuex',
    component: ViewVuex,
    meta: {
      user: true
    }
  },
  {
    path: '/demo/socket',
    name: 'socket',
    component: ViewSocket,
    meta: {
      user: true
    }
  },
  {
    path: '/demo/recursive',
    name: 'recursive',
    component: ViewRecursive,
    meta: {
      user: true
    }
  },
  {
    path: '/demo/nested',
    component: ViewNested,
    meta: {
      user: true
    },
    children: [
      {
        path: '1',
        component: UserProfile
      },
      {
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
    component: NotFound
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
