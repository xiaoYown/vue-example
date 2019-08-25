import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 向上通知
Vue.prototype['$xv:dispatch'] = function(event, payload) {
  let parent = this.$parent;
  while (this.$parent) {
    parent.$emit(event, payload);
    parent = parent.parent;
  }
};
// 向下广播
Vue.prototype['$xv:broadcast'] = function(event, payload) {
  const broadcast = children => {
    children.forEach(child => {
      child.$emit(event, payload);
      if (child.$children) {
        broadcast(child.$children);
      }
    });
  };
  broadcast(this.children);
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
