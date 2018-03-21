const path =	require('path')
const utils =	require('./utils')
const webpack =	require('webpack')
const merge =	require('webpack-merge')
const config = 	require('../config')
const baseWebpack =	require('./webpack.config.js')
const ExtractTextPlugin =	require('extract-text-webpack-plugin')
const HtmlWebpackPlugin =	require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const entries = require('../config/entries').pageEntries
const bundleLibs = require('../config/bundle.config.json').libs
const __bundleLibs = []

for (let libName in bundleLibs) {
	__bundleLibs.push(new webpack.optimize.CommonsChunkPlugin({
		name: libName,
		chunks: bundleLibs[libName].pages.concat([libName])
	}))
}

var plugins =  [
	new webpack.DefinePlugin({
		'process.env': config.build.env
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	// new webpack.optimize.OccurenceOrderPlugin(),
	new ExtractTextPlugin(utils.assetsPath('css/[name].css?[chunkhash]')), 	//单独使用style标签加载css并设置其路径
	// 提取 vendor
	// new webpack.optimize.CommonsChunkPlugin({
	// 	name: 'vendor',
	// 	minChunks: function(module, count){
	// 		return 	( 
	// 			module.resource && 
	// 			/\.js$/.test(module.resource) && 
	// 			module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
	// 		)
	// 	}
	// }),
	// 提取 vue / vuex / vue-router
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vue',
		chunks: ['vue', 'index', 'demo', 'components']
	}),
	new webpack.optimize.CommonsChunkPlugin({
    name: "manifest",
    minChunks: Infinity
  }),
	// 打包解析
	new BundleAnalyzerPlugin()
	// new webpack.optimize.CommonsChunkPlugin({
	// 	name: 'common',
	// 	chunks: ['index', 'components', 'demo']
	// }),
].concat(__bundleLibs)

var __pages = {}
var pageName
for (let libName in bundleLibs) {
	for (let i = 0, len = bundleLibs[libName].pages.length; i < len; i++) {
		pageName = bundleLibs[libName].pages[i]
		if (!__pages[pageName]) { // 入口文件对应生成
			__pages[pageName] = [pageName]
		}
		__pages[pageName].push(libName) // 使用该 lib 的入口 html 插入对应的 lib
	}
}
for (let __page in __pages) {
	__pages[__page].push('manifest')
}
Object.keys(entries).forEach(function(name){
	var plugin = new HtmlWebpackPlugin({
		filename: path.resolve(__dirname, `../dist/${name}.html`),
		template: path.resolve(__dirname, `../src/pages/${name}.html`),
		favicon: config.build.favicon,
		inject: true,
		chunks:  __pages[name], 		// 多文件打包引入
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true
		},
		chunksSortMode: 'dependency'
	});
	plugins.push(plugin);
});

var newWebpack = merge(baseWebpack, {
	output: {
		filename: utils.assetsPath('js/[name].js?h=[chunkhash]'),
		// 按需加载 模块路径指定
		chunkFilename: utils.assetsPath('js/[name].js?[chunkhash]')
	},
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true,
			usePostCSS: true
		})
	},
	// vue: {
	// 	loaders: utils.cssLoaders({
	// 		sourceMap: 	config.build.productionSourceMap,
	// 		extract: 	true
	// 	})
	// },
	plugins: plugins
});

module.exports = newWebpack;