const fs = require('fs');

function getEntries(folder) {
  let views = fs.readdirSync(folder);
  let entries = {};
  views.forEach(view => {
    entries[view] = [`${folder}/${view}/index.js`];
  });
  return entries;
}
module.exports = getEntries('./src/pages'); // 获得入口js文件