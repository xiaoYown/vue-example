import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store/index';

import './assets/js/device';
import './assets/js/rem';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
