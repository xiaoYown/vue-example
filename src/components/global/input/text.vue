<template lang="jade">
  label.global__input(:style="{ width: width + 'px' }")
    input(type="text",:placeholder="placeholder",:value="value")
    .global__input-box
</template>

<script>
  export default {
    name: 'global-text',
    props: {
      name: String,
      value: String,
      width: Number,
      placeholder: String
    },
    data () {
      return {
        val: '',
        style: {}
      }
    },
    watch: {
      value () {
        this.val = this.value
      }
    },
    created () {
      this.val = this.value
      if (typeof this.width !== 'undefined') {
        this.style = {
          width: this.width + 'px'
        }
      }
    },
    methods: {
      check () {
        this.$emit('change', {
          name: this.name,
          value: this.val
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__input {
    position: relative;
    display: block;
    height: 32px;
    margin: 0 10px;

    &-box {
      position: absolute;
      top: 0;
      right: -10px;
      bottom: 0;
      left: -10px;
      z-index: 1;
      border: 1px solid $std_sub_5;
      border-radius: 2px;
      cursor: text;
      input:focus+& {
        border: 1px solid $std_main_A;
      }
    }
    input {
      position: absolute;
      top: 1px;
      bottom: 1px;
      left: 1px;
      z-index: 2;
      width: 100%;
    }
  }
</style>
