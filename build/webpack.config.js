const webpack =	require('webpack')
const path 	=	require('path')
const glob 	=	require('glob')
const utils	=	require('./utils')
const config  = 	require('../config')
// 帮助生成 HTML 文件，在 body 元素中，使用 script 来包含所有你的 webpack bundles，只需要在你的 webpack 配置文件中如下配置：
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HappyPack = require('happypack')
// const happyThreadPool = HappyPack.ThreadPool({ size: 25 })
const vueLoaderConfig = require('./vue-loader.conf')

// const isPro = process.env.NODE_ENV == 'production'

const entries = require('../config/entries').entries

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
      	test: /\.vue$/,
      	loader: 'vue-loader',
      	options: vueLoaderConfig
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'happypack/loader?id=vue'
      // },
      {
        test: /\.js$/,
        exclude:  /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,
        loader: 'babel-loader?cacheDirectory',
        options: {
          presets: [['es2015', 'stage-2']]
          // "plugins": [
          // 	"syntax-dynamic-import",
          // 	"transform-async-to-generator",
          // 	"transform-regenerator",
          // 	["transform-runtime",
          // 	{
          // 		"helpers": false,
          // 		"polyfill": false,
          // 		"regenerator": true,
          // 		"moduleName": "babel-runtime"
          // 	}]
          // ]
        }
      },
      {
        test: /\.js|\.vue$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[ext]')
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      'src'		: path.resolve(__dirname, '../src'),
      'config'	: path.resolve(__dirname, '../config'),
      'js'		: path.resolve(__dirname, '../src/assets/js'),
      'sass'		: path.resolve(__dirname, '../src/assets/sass'),
      'images'	: path.resolve(__dirname, '../src/assets/images'),
      'components': path.resolve(__dirname, '../src/components'),
      'ui'		: path.resolve(__dirname, '../src/components/ui'),
      'plugin'	: path.resolve(__dirname, '../src/plugin'),
      'Store'		: path.resolve(__dirname, '../src/store'),
      'Views'		: path.resolve(__dirname, '../src/views'),
      'utils'		: path.resolve(__dirname, '../src/utils'),
      'tools'		: path.resolve(__dirname, '../src/tools'),
      'dist'		: path.resolve(__dirname, '../dist')
    },
    extensions: ['.js', '.vue', '.json']
  }
  // ,
  // plugins: [
  //   new HappyPack({
  //     id: 'vue',
  //     cache: true,
  //     threadPool: happyThreadPool,
  //     verbose: process.env.HAPPY_VERBOSE === '1',
  //     loaders: [
  //       {
  //         loader: 'vue-loader',
  //         options: vueLoaderConfig
  //       }
  //     ]
  //   })
  // ]
};
