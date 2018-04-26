const fs = require('fs');
const path = require('path');

function fileRead (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    })
  })
}

function fileWrite (fileName, ct, encode = 'utf-8') {
  return new Promise(function (resolve, reject) {
    fs.writeFile(fileName, ct, encode, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

async function createConfig () {
  let name = '../config/config.' + process.env.NODE_BUILD_IN + '.js'
  let originName = path.join(__dirname, name)
  let targetName = path.join(__dirname, '../config/config.js')
  let env = process.env.NODE_BUILD_IN === 'dev' ? 'dev' : 'pro'
  configStream = await fileRead(originName)
  await fileWrite(targetName, configStream)
}

createConfig()
