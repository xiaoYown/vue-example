<template>
  <div class="Test">{{ msg }} world!</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    bool: Boolean,
  },
  mehtods: {
    close() {
      this.bool = false;
    },
  },
};
</script>
