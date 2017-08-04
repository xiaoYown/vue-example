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
### demo 主要内容
```
animation vuex socket(socket 测试需要启动server目录下的socket)
```

## 生产环境构建  
```
npm run build
```

```
本次创建 vue2 项目目的 :

1. 使用 eslint 进行代码语法检查
2. 组件递归学习(未进行)
3. ui 组件编写
```

