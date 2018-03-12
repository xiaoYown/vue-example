'use strict'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

let cssLoader = utils.cssLoaders({
  sourceMap: sourceMapEnabled,
  extract: isProduction
})
module.exports = {
  loaders: {
    ...cssLoader,
    // js: 'ts-loader'
  },
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
