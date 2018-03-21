## 组件说明

1.button -- 按钮
```
标签名: global-btn
button 暂时没有 size 选项, 只有默认大小, 宽度设置 可直接设置 width
```

![](./_image/cmp-btn.png)

|属性|类型|默认值|说明|
|----|----|----|----|
| type | String |default|button的类型选择, 可选 default, ghost, fill |
| text | String |确认|-|
| disable | Boolean |false|是否禁用点击|
| icon | String |带图标button|iconfont 的 className|
| width | Number |-|宽度设置, 无时由内容撑开|

事件:
```
@click: 点击
```

2.switch
```
标签名: global-switch
```
|属性|类型|默认值|说明|
|----|----|----|----|
| name | String |-|标识|
| checked | Boolean |false| on/off |

事件:
```
@change on/off 操作
```

3.radio -- 单选框
```
标签名: global-radio
```
|属性|类型|默认值|说明|
|----|----|----|----|
| name | String |-|标识, 与原生 name 同效|
| mark | String |-| 标识|
| checked | Boolean |false| on/off |

事件:
```
@change: 选择改变
```

4.checkbox -- 多选框
```
标签名: global-checkbox
```
|属性|类型|默认值|说明|
|----|----|----|----|
| name | String |-|标识, 与原生 name 同效|
| checked | Boolean |false| on/off |
| disable | Boolean |false| 是否禁用 |

事件: @change: 选择改变

5.text -- 文本框
```
标签名: global-text
```
|属性|类型|默认值|说明|
|----|----|----|----|
| name | String |-|标识, 与原生 name 同效|
| value | [String, Number] |-| - |
| placeholder | [String, Number] |-| - |
| width | Number |-| 宽度设置, 无时为父容器宽度 |
| readOnly | Boolean |false| 是否只读 |
| icon | string |'icon-enter'| 文本框后的 icon 图标, 可填写 icon class, 默认 enter |

事件:
```
@input: 用户输入时
@enter: keydown 为 enter 时
@blur: 失去焦点
```

6.search -- 搜索框
```
标签名: global-search
```
|属性|类型|默认值|说明|
|----|----|----|----|
| name | String |-|标识|
| value | [String, Number] |-| - |
| placeholder | [String, Number] |-| - |
| width | Number |-| 宽度设置, 无时为父容器宽度 |

事件:
```
@input: 用户输入时
@enter: keydown 为 enter 时
@search: 点击搜索按钮时
@clear: 清除内容时
```