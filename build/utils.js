const path = require('path');
const APP_CONFIG = require('../app.config');

exports.assetsPath = function(_path) {
  var assetsSubDirectory = APP_CONFIG.production.assetsFileDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
