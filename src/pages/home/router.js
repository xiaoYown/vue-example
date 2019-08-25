import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import G2 from './views/G2.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/vue/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/vue/home/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/vue/home/G2',
      name: 'G2',
      component: () => import(/* webpackChunkName: "G2" */ './views/G2.vue'),
    },
  ],
});
