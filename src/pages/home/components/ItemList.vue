<template>
  <div>
    <template v-for="(item, index) in data">
      <li v-if="!render" :key="index">{{ item }}</li>
      <HocList v-else :key="index" :render="render" :data="item"></HocList>
    </template>
  </div>
</template>

<script>
import HocList from './HocList';

export default {
  components: {
    HocList,
  },
  props: {
    data: Array,
    render: Function,
  },
};
</script>
