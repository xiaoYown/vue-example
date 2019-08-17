const path = require('path');
const utils = require('./build/utils');
const webpackConfigProd = require('./build/config.pro');
const entries = require('./build/entries');
const CONFIG_PRO = require('./config.pro');
const CONFIG_DEV = require('./config.dev');

const pages = {};

Object.keys(entries).forEach(entry => {
  let suffix = process.env.NODE_ENV === 'production' ? CONFIG_PRO.templateSuffix : CONFIG_DEV.templateSuffix;
  let suffixFile = process.env.NODE_ENV === 'production' ? CONFIG_PRO.templateFileSuffix : CONFIG_DEV.templateFileSuffix;
  pages[entry] = {
    entry: entries[entry],
    template: path.join(CONFIG_PRO.templatePath, `${entry}.${suffixFile}`),
    filename: `${entry}.${suffix}`,
    chunksSortMode: 'dependency',
    chunks: ['chunk-vendors', /* 'chunk-common',  */entry]
  }
});

let serverExtends = {};

if (CONFIG_DEV.proxy && JSON.stringify(CONFIG_DEV.proxy) !== '{}') {
  serverExtends.proxy = CONFIG_DEV.proxy;
}

module.exports = {
  integrity: true,
  pages,
  lintOnSave: false,
  assetsDir: CONFIG_DEV.publicPath,
  devServer: {
    compress: true,
    port: CONFIG_DEV.port,
    quiet: true,
    historyApiFallback: {
      rewrites: CONFIG_DEV.rewrites
    },
    ...serverExtends
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return webpackConfigProd;
    }
  },
  chainWebpack: config => {
    // 移除 preload, 禁用预加载
    // config.plugins.delete('prefetch-index');
    // config.plugins.delete('preload-index');

    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('images')
        .use('url-loader')
        .tap(options => {
          return {
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: `${CONFIG_PRO.assetsFileDirectory}/images/[name].${CONFIG_PRO.timeStamp}.[ext]`
              }
            }
          };
        });
      config.plugin('extract-css')
        .tap(args => [{
          filename: utils.assetsPath(`css/[name].css?t=${CONFIG_PRO.timeStamp}`),
          chunkFilename: utils.assetsPath(`css/[id].css?t=${CONFIG_PRO.timeStamp}`)
        }]);
    }
  }
}