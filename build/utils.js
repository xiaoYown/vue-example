const networkInterfaces = require('os').networkInterfaces();
const APP_CONFIG = require('../app.config');
const path = require('path');

exports.getIPAdress = function () {
  let IP;
  Object.keys(networkInterfaces).forEach(net => {
    networkInterfaces[net].forEach(alias => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        IP = alias.address
      }
    })
  })
  return IP;
}

exports.assetsPath = function (_path) {
  var assetsSubDirectory = APP_CONFIG.production.assetsFileDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
