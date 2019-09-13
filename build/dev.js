const express =	require('express');
const webpack =	require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 打钉影响插件执行顺序, 导致 骨架屏 插件出错
const webpackMerge = require('./conf.dev');
const APP_CONFIG = require('../app.config');
// const smp = new SpeedMeasurePlugin(); // 构建打点

var app = express();

// var compiler = webpack(smp.wrap(webpackMerge));
var compiler = webpack(webpackMerge);

compiler.plugin("done", params => {
  console.log(`open your browser: ${APP_CONFIG.development.url}\n`);
});

var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/',
  stats: 'minimal'
});
// proxy api requests
Object.keys(APP_CONFIG.development.proxy).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(context, options));
});

app.use(require('connect-history-api-fallback')({
  rewrites: APP_CONFIG.development.rewrites
}));

app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler, {
  log: false,
  path: "/__webpack_hmr",
  heartbeat: 10 * 1000
}));

setTimeout(() => {
  compiler.apply(new webpack.BannerPlugin('A new banner'));
  devMiddleware.invalidate();
}, 1000);

app.use('/' + APP_CONFIG.development.assetsPublicPath, express.static(APP_CONFIG.assetsFileDirectory));

module.exports = app.listen(APP_CONFIG.port);
