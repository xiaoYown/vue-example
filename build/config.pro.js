const utils = require('./utils');
const webpack = require('webpack');
const APP_CONFIG = require('../app.config');
const { production } = APP_CONFIG;

const BANNER = `[name].js v ${APP_CONFIG.version}
Date: ${production.timeStamp}
Author: ${APP_CONFIG.author}`;

var plugins = [
  new webpack.BannerPlugin({
    banner: BANNER,
  }),
  // new BundleAnalyzerPlugin()
];
var newWebpack = {
  output: {
    path: production.assetsRoot,
    filename: utils.assetsPath(`js/[name].js?t=${production.timeStamp}`),
    chunkFilename: utils.assetsPath(
      `js/chunks/[name].js?t=${production.timeStamp}`,
    ),
    publicPath: production.assetsPublicPath,
  },
  plugins: plugins,
};

module.exports = newWebpack;
