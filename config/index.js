// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
const bundleLibs = require('./bundle.config.json').libs
// 第三方库资源设置
const libs = {}

for (let key in bundleLibs) {
	libs[key] = bundleLibs[key].modules
}

function timeformat (time) {
	return [time.getFullYear(), time.getMonth() + 1, time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()].join('-')
}

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
		time: timeformat(new Date())
	},
	dev: {
		env: require('./env.dev'),
		favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
		port: require('./config').port,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/api':{
				target: require('./config').api,
				pathRewrite:{
				    '^/api': ''
				}
			}
		},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false
	},
	libs
}
