const path = require('path');
// const HappyPack = require('happypack');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const entries = require('./entries');
const APP_CONFIG = require('../app.config');
const utils = require('./utils');

// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          ...(
            process.env.NODE_ENV === 'development' ? [
              {
                loader: 'cache-loader',
              }
            ] : []
          ),
          {
            loader: process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            // loader: 'style-loader',
            options: {
              sourceMap: true,
              hmr: process.env.NODE_ENV === 'development',
            }
          },
          // {
          //   loader: 'vue-style-loader',
          // },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('postcss-import')(),
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      // {
      //   test: /\.vue?$/,
      //   exclude: /node_modules/,
      //   use: 'happypack/loader?id=vue'
      // },
      {
        test: /\.vue?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
          }
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: `babel-loader${process.env.NODE_ENV === 'development' ? '?cacheDirectory' : ''}`
        }]
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: utils.assetsPath('images/[name].[ext]'),
        }
      },
      { // eslint 检查
        test: /\.js?$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, '../src')],
        use: [{
          loader: 'eslint-loader',
        }]
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    // new HappyPack({
    //   id: 'vue',
    //   threadPool: happyThreadPool,
    //   loaders: [
    //     {
    //       loader: 'vue-loader',
    //     }
    //   ],
    // }),
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
            skeletonId: 'skeletons-vue-home',
          },
          {
            path: '/vue/home/about',
            skeletonId: 'skeletons-vue-home-about',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.vue', '.scss']
  },
  externals: APP_CONFIG.externals
};
