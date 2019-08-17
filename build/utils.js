const networkInterfaces = require('os').networkInterfaces();
const path = require('path');
const CONFIG_PRO = require('../config.pro');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = CONFIG_PRO.assetsFileDirectory
  return path.posix.join(assetsSubDirectory, _path)
};

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
