const webpack =	require('webpack')
const path 	=	require('path')
const glob 	=	require('glob')
const utils	=	require('./utils')
const config  = 	require('../config')
// 帮助生成 HTML 文件，在 body 元素中，使用 script 来包含所有你的 webpack bundles，只需要在你的 webpack 配置文件中如下配置：
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 搭配html-webapck-plugin使用,将css作为chunk追加到对应html中
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')

const isPro = process.env.NODE_ENV == 'production'

function getEntry(globPath) {
  	var entries = {}, basename;
	glob.sync(globPath).forEach(function (entry) {
		basename = path.basename(entry, path.extname(entry));
		entries[basename] = [];
		// entries[basename].push(entry);
		entries[basename].push(entry);
	});
	return entries;
}
var entries = getEntry("./src/views/*/*.js"); // 获得入口js文件

module.exports = {
	entry: entries,
	output: {
		path: config.build.assetsRoot,
		// [name] 替换成chunk名称， [hash] 替换成对应chunk 的 hash 值, 解决hash的方式: 静态资源引入采用 import 方式
		filename: '[name].js', // 使用chunkhash : '[name]-[hash].js'
		publicPath: isPro ? config.build.assetsPublicPath : config.dev.assetsPublicPath // 文件引入路径
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
				// options: {
				// 	loaders: {
				// 		css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
				// 			use: 'css-loader',
				// 			fallback: 'style-loader'
				// 		})),
				// 		scss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
				// 			use: ['css-loader', 'postcss-loader', 'sass-loader'],
				// 			fallback: 'style-loader'
				// 		})),
				// 		postcss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
				// 			use: ['css-loader', 'postcss-loader'],
				// 			fallback: 'style-loader'
				// 		}))
				// 	}
				// }
			},
			{
				test: /\.js$/,
				exclude:  /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/,
				loader: 'babel-loader?cacheDirectory',
				options: {
					presets: ['es2015']
				}
			},
			{
				test: /\.js|\.vue$/,
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
	// postcss: [ require('autoprefixer') ],
	// 	node: {
	// 	fs: 'empty'
	// }
};

