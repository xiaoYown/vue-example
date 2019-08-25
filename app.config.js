const path = require('path');
const networkInterfaces = require('os').networkInterfaces();

function getIPAdress() {
  let IP;
  Object.keys(networkInterfaces).forEach(net => {
    networkInterfaces[net].forEach(alias => {
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        IP = alias.address;
      }
    });
  });
  return IP;
}

function timeformat(time) {
  return {
    time: `${time.getFullYear()}-${time.getMonth() +
      1}-${time.getDate()}(${time.getHours()}:${time.getMinutes()})`,
    timeValue: time.valueOf(),
  };
}

const IP = getIPAdress();
const PORT = 8000;
const BUILD_TIME = timeformat(new Date());

const CONFIG = {
  name: 'example-js',
  version: '0.0.1',
  author: 'xiaoYown',
  templateSuffix: 'html', // 未编译文件后缀
  templatePath: path.resolve(__dirname, `./src/htmls`),

  development: {
    url: `http://${IP}:${PORT}/vue/home`,
    port: PORT,
    templateFileSuffix: 'html', // 已编译模板后缀
    rewrites: [
      { from: /\/vue\/home(\/|$)/, to: '/home.html' },
      { from: /\/vue\/login(\/|$)/, to: '/login.html' },
      { from: /\/vue\/mobile(\/|$)/, to: '/mobile.html' },
    ],
    proxy: {
      // 请求代理
      // '/api': {
      //   target: domain,
      //   pathRewrite:{
      //     '^/api': ''
      //   }
      // }
    },
  },

  production: {
    timeStamp: BUILD_TIME.time,

    templateFileSuffix: 'ejs', // 已编译模板后缀
    assetsRoot: path.resolve(__dirname, './dist'),
    publicPath: 'static',
    assetsFileDirectory: 'static/vue', // 文件生成到 dist 下的路径
    assetsPublicPath: '/', // 打包后路径资源前缀
  },
};

module.exports = CONFIG;
