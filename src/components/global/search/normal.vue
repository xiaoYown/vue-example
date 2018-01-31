<template lang="jade">
  label.global__search
    .global__search-wrap
      input(type="text",:placeholder="placeholder",:value="value")
      .global__search-box
        .iconfont.icon-search
</template>

<script>
  export default {
    name: 'global-search',
    props: {
      type: {
        type: String,
        default: 'default' // ghost
      },
      placeholder: String,
      value: String
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__search {
    display: block;
    &-wrap {
      position: relative;
    }
    input {
      position: absolute;
    } 
    &-box {
      border: 1px solid $std_main_A;
      border-radius: 2px;
    }
  }
</style>
