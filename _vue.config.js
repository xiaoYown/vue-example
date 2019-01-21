const path = require('path')
const webpackConfig = require('./webpack.config')

module.exports = {
  lintOnSave: false,
  configureWebpack (config) {
    if (process.env.NODE_ENV !== 'production') {
      return webpackConfig
    } else {
      return
    }
  }
}