var path 				=   require('path'),
	config 				= 	require('../config');

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

var	webpack 			=	require('webpack'),
	merge 				=	require('webpack-merge'),
	HtmlWebpackPlugin 	=	require('html-webpack-plugin'),
	utils				=	require('./utils'),
	baseWebpack			=	require('./webpack.config');

process.env.NODE_ENV = config.dev.env;

var plugins = [
	// new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
	new webpack.NoErrorsPlugin(),
	new webpack.HotModuleReplacementPlugin()
];

Object.keys(baseWebpack.entry).forEach(function(name){
	if( name == 'jquery' || name == 'vue' ) return;
	baseWebpack.entry[name] = ['./build/dev-client'].concat(baseWebpack.entry[name]);

	var plugin = new HtmlWebpackPlugin({
		filename: name + '.html',
		template: path.resolve(__dirname, `../src/pages/${name}.html`), // page entries 
		favicon: config.dev.favicon,
		inject: true,
		chunks: [name]
	});
	plugins.push(plugin);
});

var newWebpack = merge(baseWebpack, {
	module: {
		loaders: utils.styleLoaders({ sourceMap: false })
	},
	devtool: '#eval-source-map',
  	plugins: plugins
});

module.exports = newWebpack;

