import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/vue/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home-view-index", webpackPrefetch: true */ './views/Home'),
    },
    {
      path: '/vue/home/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "home-view-about", webpackPrefetch: true */ './views/About'),
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "home-view-docs", webpackPrefetch: true */ '@/components/404'),
    },
  ],
});
