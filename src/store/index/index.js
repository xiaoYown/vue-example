import Vue 				from 'vue';
import Vuex 			from 'vuex';

import middlewares 		from '../middlewares';

import user 			from './modules/user';

Vue.config.debug = true;
Vue.use(Vuex);
Vue.config.warnExpressionErrors = false;

const store = new Vuex.Store({
  modules: {
    user,
  },
    strict: process.env.NODE_ENV !== 'production',
    middlewares
});
export default store
/*
  state     -- 每个应用将仅仅包含一个 store 实例
        -- 单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照
  getters   -- 有时候我们需要从 store 中的 state 中派生出一些状态
  mutations -- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
        -- Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)
        -- 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数

*/
