const path = require('path');
// const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueSkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const AssetsCDNPWebpackPlugin = require('assets-cdn-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const entries = require('./entries');
const APP_CONFIG = require('../app.config');
const utils = require('./utils');

// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const IS_DEV = process.env.NODE_ENV !== 'development';

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          ...(
            IS_DEV ? [
              {
                loader: 'cache-loader',
              }
            ] : []
          ),
          {
            loader: !IS_DEV ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
              hmr: IS_DEV,
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              // plugins: [
              //   require('postcss-import')(),
              // ]
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{
          loader: `babel-loader${IS_DEV ? '?cacheDirectory' : ''}`
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: IS_DEV // disables Hot Reload
        }
      },
      { // eslint 检查
        test: /\.js?$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, '../src')],
        use: [{
          loader: 'eslint-loader',
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: utils.assetsPath('images/[name].[ext]'),
        }
      },
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new AssetsCDNPWebpackPlugin(APP_CONFIG.injectAssets),
    new VueSkeletonWebpackPlugin({
      webpackConfig: {
        entry: APP_CONFIG.skeletons.entry
      },
      quiet: true,
      minimize: true,
      router: APP_CONFIG.skeletons.routers
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.vue']
  },
  externals: APP_CONFIG.externals
};
