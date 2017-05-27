# demo说明

## 开发
```
 npm install
 npm run dev
```
在浏览器中自动打开 http://localhost:3000

## 调试
- 默认开启 vue-devtools [chrome浏览器扩展](https://github.com/vuejs/vue-devtools), 生产环境自动关闭.

### 目录结构

```
.           
├── README.md           
├── build                    // 环境配置文件
├── config                   // 项目配置文件
├── dist                     // build目录
├── src                      // 开发文件目录
│   ├── assets               // css 和图片资源
│   ├── components           // 组件
│   ├── pages                // html页面
│   ├── tools                // 工具函数
│   │    ├── client.js       // client 客户端存储方法
│   │    ├── utils.js        // 一些常用方法
│   ├── views                // 页面组件目录(对应html的入口文件以及当前html的router)
│   ├── vuex                 // vuex相关文件, store,action
└── .babelrc                 // babel配置
.
```
## 生产环境构建  
```
npm run build
```

