const path = require('path');
const networkInterfaces = require('os').networkInterfaces();

function getIPAdress() {
  let IP;
  Object.keys(networkInterfaces).forEach(net => {
    networkInterfaces[net].forEach(alias => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        IP = alias.address;
      }
    });
  });
  return IP || '127.0.0.1';
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
  name: 'template-js',
  version: '0.0.1',
  author: 'xiaoYown',
  port: PORT,
  templateSuffix: 'ejs', // 未编译文件后缀
  templatePath: path.resolve(__dirname, `./src/htmls`),
  assetsFileDirectory: path.resolve(__dirname, `./static`),
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
  },
  inject: {
    CDN: '/static/vue/js/libs',
    rename: name => `${name}.min.js`, // not must
    htmls: {
      home: ['vue', 'vue-router', 'vuex']
    }
  },
  skeletons: require('./skeletons'),

  development: {
    url: `http://${IP}:${PORT}/vue/home`,
    port: PORT,
    templateFileSuffix: 'html', // 已编译模板后缀
    assetsPublicPath: 'static',
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

    templateFileSuffix: 'html', // 已编译模板后缀
    assetsRoot: path.resolve(__dirname, './dist'),
    assetsFileDirectory: 'static/vue', // 文件生成到 dist 下的路径
    assetsPublicPath: '/', // 打包后路径资源前缀
    copyFromDirectory: path.resolve(__dirname, './static'), // 拷贝静态资源文件夹路径
    copyDictDirectory: path.resolve(__dirname, './dist'), // 拷贝目标路径

    // 打包成功后江 dist 下文件拷贝到对应文件夹下
    takeToProject: false, // 是否将 dist 的文件拷贝到项目下
    viewsFolder: '/xiaoyown/web/blog-koa/views/react',
    staticFolder: '/xiaoyown/web/blog-koa/static',
  },
};

module.exports = CONFIG;
