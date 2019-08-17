<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- 传入所有属性 -->
    <!-- <component-u v-bind="$attrs" v-on="$listeners"></component-u> -->
    <Child />
  </div>
</template>

<script>
import Child from './Child';

export default {
  components: {
    Child
  },
  inheritAttrs: false, // 阻止上级传参添加到 dom 节点上
  provide () { // vm._provide
    return {
      scope: this.scope
    }
  },
  data () {
    return {
      scope: {
        name: 'xv'
      }
    }
  }
}
</script>
