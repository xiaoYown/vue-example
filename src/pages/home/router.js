import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/vue/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home-view-index" */ './views/Home.vue')
    },
    {
      path: '/vue/home/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "home-view-about" */ './views/About.vue')
    }
  ]
});
