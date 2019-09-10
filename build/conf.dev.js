const path =	require('path');
const webpack =	require('webpack');
const merge =	require('webpack-merge');
const HtmlWebpackPlugin =	require('html-webpack-plugin');
const baseWebpack =	require('./webpack.config');
const APP_CONFIG = require('../app.config');
const DashboardPlugin = require("webpack-dashboard/plugin");

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

let plugins = [
  new webpack.DefinePlugin({
    'process.env': 'development'
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new DashboardPlugin()
];

Object.keys(baseWebpack.entry).forEach(function(name){
  baseWebpack.entry[name].push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');
  let plugin = new HtmlWebpackPlugin({
    filename: name + `.${APP_CONFIG.development.templateFileSuffix}`,
    template: path.join(APP_CONFIG.templatePath, `${name}.${APP_CONFIG.templateSuffix}`), // page entries
    inject: true,
    chunks: [name]
  });
  plugins.push(plugin);
});

let newWebpack = merge(baseWebpack, {
  mode: 'development',
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  // devtool: '#source-map',
  plugins: plugins
});

module.exports = newWebpack;
