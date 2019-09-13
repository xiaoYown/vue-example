const path = require('path');

module.exports = {
  entry: {
    home: path.resolve('./skeletons/home.vue'),
  },
  routers: {
    mode: 'history',
    routes: [
      {
        path: '/vue/home',
        skeletonId: 'skeletons-vue-home',
      },
      {
        path: '/vue/home/about',
        skeletonId: 'skeletons-vue-home-about',
      },
    ],
  },
}