const fs = require('fs');

function getEntries(folder) {
  let views = fs.readdirSync(folder);
  let entries = {};
  views.forEach(view => {
    entries[view] = [`${folder}/${view}/index.js`];
  });
  return entries;
}
let entries = getEntries('./src/pages'); // 获得入口js文件

module.exports = entries;
