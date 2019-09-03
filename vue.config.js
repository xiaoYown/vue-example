const path = require('path');
const VueSkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const utils = require('./build/utils');
const webpackConfigProd = require('./build/config.pro');
const entries = require('./build/entries');
const APP_CONFIG = require('./app.config');

const { development, production } = APP_CONFIG;
const pages = {};

Object.keys(entries).forEach(entry => {
  let suffix = APP_CONFIG.templateSuffix;
  let suffixFile =
    process.env.NODE_ENV === 'production'
      ? production.templateFileSuffix
      : development.templateFileSuffix;
  pages[entry] = {
    entry: entries[entry],
    template: path.join(APP_CONFIG.templatePath, `${entry}.${suffix}`),
    filename: `${entry}.${suffixFile}`,
    chunksSortMode: 'dependency',
    chunks: ['chunk-vendors', /* 'chunk-common',  */ entry],
  };
});

let serverExtends = {};
if (development.proxy && JSON.stringify(development.proxy) !== '{}') {
  serverExtends.proxy = development.proxy;
}

module.exports = {
  integrity: true,
  pages,
  lintOnSave: false,
  devServer: {
    compress: true,
    port: development.port,
    quiet: true,
    historyApiFallback: {
      rewrites: development.rewrites,
    },
    ...serverExtends,
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return webpackConfigProd;
    } else {
      return {
        plugins: [
          new VueSkeletonWebpackPlugin({
            webpackConfig: {
              entry: {
                home: path.resolve('./skeletons/home.js'),
              },
            },
            quiet: true,
            minimize: true,
            router: {
              mode: 'history',
              routes: [
                {
                  path: '/vue/home',
                  skeletonId: 'vue-home',
                },
                {
                  path: '/vue/home/about',
                  skeletonId: 'vue-home-about',
                },
              ],
            },
          }),
        ],
      };
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
        .tap(() => {
          return {
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: `${production.assetsFileDirectory}/images/[name].${production.timeStamp}.[ext]`,
              },
            },
          };
        });
      config.plugin('extract-css').tap(() => [
        {
          filename: utils.assetsPath(
            `css/[name].css?t=${production.timeStamp}`,
          ),
          chunkFilename: utils.assetsPath(
            `css/[id].css?t=${production.timeStamp}`,
          ),
        },
      ]);
    }
  },
};
