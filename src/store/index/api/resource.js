import Vue from 'vue';
import VueResource from 'vue-resource';
// import { getCookie, signOut } from '../utils/authService' //引入登录、获取cookie方法
var CONFIG = require('config/config.js'); //获取URL配置

Vue.use(VueResource); //注册VueResource

// HTTP相关
Vue.http.options.crossOrigin	= true;
Vue.http.options.credentials	= true;
Vue.http.options._timeout		= 11000; //11秒超时请求

Vue.http.interceptors.push((request, next) => {
  let timeout;
  // 这里对请求体进行处理
  request.headers = request.headers || {};

  if (request._timeout) {
    // 设置定时器，只要触发就立即返回 response ， 并且自定义了 status 和 statusText
    timeout = setTimeout(() => {
      next(request.respondWith(request.body, {
        status: 502,
        statusText: 'Request Timeout'
      }));
      request.abort();
    }, request._timeout);
  }
  next((response) => {
    clearTimeout(timeout);
    // 这里可以对响应的结果进行处理
    if (response.status === 401) {
      //signOut();
      window.location.pathname = '/'
    }
    return response
  });
});

export const index = Vue.resource(CONFIG.apiUrl + '/test.json');

