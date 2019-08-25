<template>
  <div>
    {{ scope }}
  </div>
</template>

<script>
// $nextTick
export default {
  inheritAttrs: false,
  inject: ['scope'], // vm.$parent._provide
};
</script>
