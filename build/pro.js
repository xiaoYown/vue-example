require('shelljs/global'); // can replace unix shell scripts on nodejs

const path =	require('path')
const config =	require('../config')
const ora =	require('ora')
const webpack =	require('webpack')

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV);

var webpackMerge = require('./conf.pro');

console.log([
	'  Tip:\n' ,
	'  Built files are meant to be served over an HTTP server.\n' ,
	'  Opening index.html over file:// won\'t work.\n'
].join(''));

var spinner = ora('building for production...');
spinner.start();

var assetsPath = path.join(path.resolve(__dirname, '../dist'), config.build.assetsSubDirectory);

rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'static/', path.join(assetsPath, '../'));

webpack(webpackMerge, function (err, stats) {
	spinner.stop()
	if (err) throw err;
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n')
});
