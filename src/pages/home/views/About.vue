<template>
<div class="about">
    <h1>This is an about page</h1>
    <Child />
    <HocLevel :level="1">标题 1</HocLevel>
    <HocLevel :level="2">标题 2</HocLevel>
    <HocLevel :level="3">标题 3</HocLevel>
    <!-- 组件封装 iview -->
    <ItemList :data="list" :render="render" />
    <br />
    <!-- 组件封装 element-ui -->
    <XvSlot :data="dataSlot">
      <template v-slot:user="{ username, index }">
        <li>{{ index }} : {{ username }}</li>
      </template>
    </XvSlot>
    <!-- 传入所有属性 -->
    <!-- <component-u v-bind="$attrs" v-on="$listeners"></component-u> -->
  </div>
</template>
<script>
import Child from '../components/Child';
import HocLevel from '../components/HocLevel';
import ItemList from '../components/ItemList';
import XvSlot from '../components/Slot';

export default {
  // functional: true,
  inheritAttrs: false, // 阻止上级传参添加到 dom 节点上
  components: {
    Child,
    HocLevel,
    ItemList,
    XvSlot,
  },
  provide() {
    // vm._provide
    return {
      scope: this.scope,
    };
  },
  data() {
    return {
      scope: {
        name: 'xv',
      },
      list: ['text 1', 'text 2', 'text 3'],
      dataSlot: [{ name: 'name - 1' }, { name: 'name - 2' }],
    };
  },
  methods: {
    render (hyperscript, data) {
      return <span style="padding: 0 19px;">{data}</span>;
    },
  }
};
</script>
