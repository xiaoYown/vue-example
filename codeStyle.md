## vue 文件

### 1.组件/实例的选项顺序

- name
- extends / mixins
- model / props / propsData
- data / computed
- watch / 生命周期钩子
- methods

### 2.元素特性的顺序

- is
- v-for / v-if / v-else-if / v-else / v-show / v-cloak
- v-pre / v-once
- id
- ref / key / slot
- v-model
- v-on
- v-html / v-text

### 3.组件复用

- 尽量避免组件的拷贝, 可增加组件扩展性或使用extends进行组件的扩展使用
- 

## 样式

- 注意不要使用单组件或内部组件样式. 公用样式提取到sass文件中, 父组件可控制其子组件样式, 单不可使用其子组件样式
(更新webpack后模块引入均采用异步实现, 若是使用的 class 来源于未加载组件, 则样式不可见)

- 样式命名
```
布局(g): 以 g 为命名空间
  例: .g-wrap , .g-header, .g-content.
状态(s): 以 s 为命名空间, 表示动态的, 具有交互性质的状态
  例: .s-active,  s-selected.
工具(u): 以 u 为命名空间, 表示不耦合业务逻辑的, 可复用的工具
  例: u-clearfix, u-ellipsis.
组件(m/p): 
  复用: 以 m 为命名空间, 表示可复用, 移植的组件模块
    例: m-slider.
  非复用: 以 p 为命名空间, 表示私有组件, 仅单一位置使用
    例: p-format, p-sidebar
钩子(j): 以 j 为命名空间, 表示特定给 JavaScript 调用的类名
  例: j-request, j-open.
```

## js 文件
- 遵循 eslint 常用配置(多使用 eslint 工具编写, 养成习惯)
- 缩进采用 2 空格缩进
- 分号结合框架, vue 风格为不使用分号
- 变量定义尽量不要放在一行内
```
  let a = 10, b = 10
  ->
  let a = 10
  let b = 10
```
- 函数定义空格 function fn () { ... }
- 注释空格 var a = 10 // 解释
- 模块末尾追加多余一行空行
