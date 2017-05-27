var merge = require('webpack-merge');
var prodEnv = require('./env.pro');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
});