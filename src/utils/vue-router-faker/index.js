let Vue;

class Router {
  constructor ({ routes, }) {
    this.routeMap = routes.reduce((preVal, curVal) => {
      preVal[curVal.path] = curVal.component;
      return preVal;
    }, {});
    this._route = { current: '/', };
    // 定义响应式数据
    Vue.util.defineReactive(this, '_route', { current: '/', });
    // window.addEventListener('load', () => {
    //   // 默认跳转首页
    //   if (!window.location.pathname) {
    //     window.location.pathname = '/';
    //   }
    // });
  }
}

// 扩展 属性|组件|指令
Router.install = _Vue => {
  Vue = _Vue;
  // 给每个组件混合属性
  Vue.mixin({
    beforeCreate () {
      // 递归实现实例 router 属性附加
      if (this.$options && this.$options.router) {
        this._router = this.$options.router;
      } else {
        // 让所有的子组件都有这个 _router 属性 指向 router
        this._router = this.$parent && this.$parent._router;
      }
      // 每个组件 $router $route
      Object.defineProperty(this, '$router', {
        value: {},
      });
      Object.defineProperty(this, '$route', {
        value: {},
      });
    },
  });
  // router-view router-link
  Vue.component('router-view', {
    render (hyperscript) {
      return hyperscript(this._router.routeMap[this._router._route.current]);
    },
  });
  Vue.component('router-link', {
    props: {
      to: String,
    },
    render () {
      return <a href={ this.to }>{ this.$slots.default }</a>;
    },
  });
};

export default Router;
