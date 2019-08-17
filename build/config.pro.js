const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const CONFIG_PRO = require('../config.pro');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = require('./entries');

const BANNER =
`[name].js v ${CONFIG_PRO.version}
Date: ${CONFIG_PRO.timeStamp}
Author: ${CONFIG_PRO.author}`;


var plugins = [
  new webpack.BannerPlugin({
    banner: BANNER
  }),
  // new BundleAnalyzerPlugin()
];
var newWebpack = {
  output: {
    path: CONFIG_PRO.assetsRoot,
    filename: utils.assetsPath(`js/[name].js?t=${CONFIG_PRO.timeStamp}`),
    chunkFilename: utils.assetsPath(`js/chunks/[name].js?t=${CONFIG_PRO.timeStamp}`),
    publicPath: CONFIG_PRO.assetsPublicPath
  },
  plugins: plugins,
};

module.exports = newWebpack;