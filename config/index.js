// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
	build: {
		env: require('./env.pro'),
		favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		productionSourceMap: false,
		cacheBusting: true,
    		cssSourceMap: true,
		chunks: [
			// {
			// 	node_module: true,
			// 	name: 'vue',
			// 	filename: 'vue.js',
			// 	chunks: Infinity
			// },
			{
				node_module: true,
				name: 'vendor'
			},
		]
	},
	dev: {
		env: require('./env.dev'),
		port: require('./config').port,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),

		host: 'localhost',
		autoOpenBrowser: false,
    errorOverlay: true,
		notifyOnErrors: true,
		poll: false,
		useEslint: true,
		showEslintErrorsInOverlay: false,
		devtool: 'cheap-module-eval-source-map',
		cacheBusting: true,
    cssSourceMap: true,

		proxyTable: {
			'/api':{
				target: require('./config').api,
				pathRewrite:{
				    '^/api': ''
				}
			}
		}
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
	}
}
