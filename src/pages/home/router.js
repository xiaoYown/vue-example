import Vue from 'vue';
// import Router from '@/utils/vue-router-faker';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import G2 from './views/G2.vue';

Vue.use(Router);

const About = () => import(/* webpackChunkName: "about" */ './views/About.vue');
const G2 = () => import(/* webpackChunkName: "G2" */ './views/G2.vue');

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
      component: About,
    },
    {
      path: '/vue/home/G2',
      name: 'G2',
      component: G2,
    },
  ],
});
