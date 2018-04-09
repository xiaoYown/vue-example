const path =	require('path')
const utils =	require('./utils')
const webpack =	require('webpack')
const merge =	require('webpack-merge')
const config = 	require('../config')
const baseWebpack =	require('./webpack.config.js')
// const ExtractTextPlugin =	require('extract-text-webpack-plugin')
const HtmlWebpackPlugin =	require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const pageEntries = require('../config/entries').pageEntries
const entries = require('../config/entries').entries
const bundleLibs = require('../config/bundle.config.json').libs
// 提供全局变量的插件, 需要从所有入口文件中进行提取
const provide = require('../config/bundle.config.json').provide
// 分离公共模块
const __bundleLibs = []

let __chunks = []
// lib 作为公共部分抽取
let __cacheGroups = {}
for (let libName in bundleLibs) {
	if (provide.indexOf(libName) < 0) { // 非全局插件抽取
		__chunks = bundleLibs[libName].pages.concat([libName])
	} else { // 全局插件抽取
		__chunks = Object.keys(entries)
	}
	__cacheGroups[libName] = {
		name: libName
	}
	// __bundleLibs.push(
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		name: libName,
	// 		chunks: __chunks
	// 	})
	// )
}
__cacheGroups.manifest = {
		name: 'manifest'
}
// __bundleLibs.push(
// 	new webpack.optimize.CommonsChunkPlugin({
// 		name: 'manifest',
// 		minChunks: Infinity
// 	})
// )

var plugins =  [
	// new webpack.DefinePlugin({
	// 	'process.env': config.build.env
	// }),
	// new webpack.optimize.OccurenceOrderPlugin(),
	// new ExtractTextPlugin(utils.assetsPath('css/[name].css?v=[chunkhash]')), 	//单独使用style标签加载css并设置其路径
	new BundleAnalyzerPlugin()
].concat(__bundleLibs)

var __pages = {}
Object.keys(pageEntries).forEach((page) => {
	// manifest 插入
	__pages[page] = ['manifest']
	// 判断此页面是否需要插入对应的库
	for (let libName in bundleLibs) {
		if (bundleLibs[libName].pages.indexOf(page) > -1) {
			__pages[page].push(libName)
		}
	}
	// 插入对应入口文件
	__pages[page].push(page)
})

Object.keys(pageEntries).forEach(function(name){
	var plugin = new HtmlWebpackPlugin({
		filename: path.resolve(__dirname, `../dist/${name}.html`),
		template: path.resolve(__dirname, `../src/pages/${name}.html`),
		favicon: config.build.favicon,
		inject: true,
		chunks: __pages[name], 		// 多文件打包引入
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true
		},
		// chunksSortMode: 'dependency'
		chunksSortMode: 'auto'
	});
	plugins.push(plugin);
});

var newWebpack = merge(baseWebpack, {
	mode: config.build.env.NODE_ENV,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].js?t=' + config.build.time),
		// 按需加载 模块路径指定
		chunkFilename: utils.assetsPath('js/[name].js?t=' + config.build.time),
		publicPath: config.build.assetsPublicPath
	},
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true,
			usePostCSS: true
		})
	},
	optimization: {
		minimize: false,
		splitChunks: {
			chunks: "async",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			// cacheGroups: __cacheGroups
			cacheGroups: {
				vue: {
					name: "vue",
					chunks: "all",
					test: /[\\/]node_modules[\\/]vue/
				}
			}
		},
		runtimeChunk: true
	},
	plugins: plugins
});

module.exports = newWebpack;