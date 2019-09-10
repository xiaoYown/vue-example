const PLUGIN_NAME = 'AssetsCDNWebpackPlugin';

function defaultRename (type, name) {
  return name + `.${type}`;
}
function defaultFullURL (baseURL, type, name) {
  return `${baseURL}/${this.rename(type, name)}`;
}
// 格式化插入的脚本标签
function formatTag (type) {
  let tag = {
    css: '  <link rel="stylesheet" href="<slot>">',
    js: '  <script type="text/javascript" src="<slot>"></script>'
  };
  return url => {
    return tag[type].replace('<slot>', url);
  }
}
// 替换到 html 模板上
function injectSlot (html, place) {
  let tag = {
    header: '</head>',
    footer: '</body>'
  };
  let tagEnd = tag[place];
  return slot => html.replace(tagEnd, `${slot}\n${tagEnd}`);
}

function ExternalsPlugin (options = {}) {
  this.baseURL = options.baseURL || '/';
  this.rename = options.rename || defaultRename;
  this.fullURL = options.fullURL || defaultFullURL;
  this.htmls = options.htmls || {};
}
 
ExternalsPlugin.prototype.apply = function (compiler) {
  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.make.tapAsync(PLUGIN_NAME, (compilation, cb) => {
      if (!compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing) {
        console.error('HtmlExternalWebpackPlugin must be placed after HtmlWebpackPlugin in `plugins`.');
        return;
      }
      setTimeout(() => {
        cb();
      }, 1000);
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(PLUGIN_NAME, (htmlPluginData, callback) => {
        this.injectTag(this.htmls, htmlPluginData);
        callback(null, htmlPluginData);
      });
    });
  } else {
    // webpack 3 support
    compilation.plugin('html-webpack-plugin-after-emit', (htmlPluginData, callback) => {
      htmlPluginData.html = this.injectTag(this.htmls, htmlPluginData);
      callback(null, htmlPluginData);
    });
  }
};
// 注入标签
ExternalsPlugin.prototype.injectTag = function (htmls, htmlData) {
  let webpackHtmlFilename = htmlData.outputName.replace(/\.html/, '');
  let html = htmls[webpackHtmlFilename] ?
    this.replaceHtml(htmls[webpackHtmlFilename], htmlData)
    : htmlData.html;
  htmlData.html = html;
}
// 模板替换
ExternalsPlugin.prototype.replaceHtml = function (fileTypes, htmlData) {
  let html = htmlData.html;
  let injectPlace = { css: 'header', js: 'footer' };

  ['css', 'js'].forEach(key => {
    if (key in fileTypes) {
      let hasInjectSlot = fileTypes[key].constructor.toString() !== 'function Array() { [native code] }';
      let libs = hasInjectSlot ? (fileTypes[key].libs || []) : fileTypes[key];
    
      let tags = libs.map(fileName => {
        return formatTag(key)(this.fullURL.call(this, this.baseURL, key, fileName));
      }).join('\n');

      let slotTemplate = `<\!-- assets-cdn-slot-${key} -->`;
      let place = injectPlace[key];
      // 无注入注释时, 根据 slot 先注入注释
      if (!(new RegExp(slotTemplate)).test(html)) {
        if (hasInjectSlot) {
          place = fileTypes[key].slot;
          html = injectSlot(html, place)(slotTemplate);
        } else {
          html = injectSlot(html, injectPlace[key])(slotTemplate);
        }
      }
      // 将 slot 注释替换成标签
      html = html.replace(new RegExp(slotTemplate), tags);
    }
  })
  return html;
}
 
module.exports = ExternalsPlugin;
