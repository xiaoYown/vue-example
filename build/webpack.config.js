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
			},
			{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: utils.assetsPath('files/[name].[ext]')
				}
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      'config'	: path.resolve(__dirname, '../config')
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
