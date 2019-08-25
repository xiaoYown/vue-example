<template>
  <div>
    <template v-for="(item, index) in data">
      <!-- 属性键名不能使用 name 等内置属性名 -->
      <slot name="user" :username="item.name" :index="index"></slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
};
</script>
