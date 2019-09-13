require('shelljs/global'); // can replace unix shell scripts on nodejs

const path = require('path');
const APP_CONFIG = require('../app.config');
const ora =	require('ora');
const webpack =	require('webpack');
const entries = require('./entries');

let webpackMerge = require('./conf.pro');
let spinner = ora('building for production...');
spinner.start();

rm('-rf', APP_CONFIG.production.assetsRoot);
mkdir('-p', APP_CONFIG.production.assetsRoot);
mkdir('-p', APP_CONFIG.production.copyDictDirectory);
cp('-R', APP_CONFIG.production.copyFromDirectory + '/', APP_CONFIG.production.copyDictDirectory);

webpack(webpackMerge, function (err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
  if (APP_CONFIG.production.takeToProject) {
    mkdir(APP_CONFIG.production.viewsFolder);
    // copy template
    Object.keys(entries).forEach(page => {
      let fileName = `${page}.${APP_CONFIG.production.templateFileSuffix}`;
      let viewPath = path.join(APP_CONFIG.production.assetsRoot, fileName);
      cp('-R', viewPath, path.join(APP_CONFIG.production.viewsFolder, fileName))
    });
    // copy static source
    cp('-R', path.join(APP_CONFIG.production.assetsRoot, APP_CONFIG.production.assetsFileDirectory), APP_CONFIG.production.staticFolder);
  }
});
