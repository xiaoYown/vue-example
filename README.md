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
2. 组件递归学习
3. ui 组件编写
```

```
webpack 升级 v3 目的 :

1. 构建工具作为开发的根本, 最好能做定期检查工具本身以及项目中使用到的插件的更新进行检查, 防止在未来工具某些功能对项目的限制, 必须要进行更新时, 脚手架修改幅度过大, 导致需要花费较长时间对其进行升级, 并且可能会带有隐藏的问题而不能及时发现
2. webpack 的升级给开发环境以及生产环境的文件都进行了一定程度上的优化

```

```
开发过程中需要注意的事项:

1. 尽量遵循一定的代码风格(可参照 eslint)
2. 需要使用的第三方脚本插件 / 库 使用 :
    var component = r => require.ensure([], () => r(require('./component_path')), 'component_name')
  的方式进行引入, 因为在 webpack 的公共模块提取中很难做到第三方插件的直接分离
  注意: 为保证相同的第三方插件使用在打包后取自同一文件, 命名需要相同
```

