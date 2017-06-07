import Vue 				from 'vue';
import Vuex 			from 'vuex';

import middlewares 		from '../middlewares';

import user 			from './modules/user';
import demo 			from './modules/demo';

Vue.config.debug = true;
Vue.use(Vuex);
Vue.config.warnExpressionErrors = false;

const store = new Vuex.Store({
  modules: {
    user,
    demo,
  },
    strict: process.env.NODE_ENV !== 'production',
    middlewares
});
export default store

