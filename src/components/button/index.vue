<template lang="jade">
  button(
    :class="(!type ? 'xy-button' : 'xy-button-' + type) + ' ' + size",
    @click="click"
  )
    slot

</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      }
      /* ,
      disabled: {
        type: Boolean,
        default: false
      } */
    },
    methods: {
      click () {
        !this.disabled && this.$emit('click')
      }
    }

  }
</script>

<style lang="sass">
  @import './common.scss';
  
  %common {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
  }

  .xy-button {
    // 公用
    &, &-success, &-warning, &-danger {
      @extend %common;
      box-sizing: border-box;
      color: #fff;
      &.small {
        font-size: 12px;
        padding: 4px 6px;
      }
      &.large {
        font-size: 16px;
        padding: 8px 12px;
      }
    }
    // 普通
    background-color: #56aaff;
    &:hover {
      background-color: #76b4f3;
    }
    &:active {
      background-color: #4c7cf7;
    }
    // 成功
    &-success {
      background-color: #13ce66;
      &:hover {
        background-color: #6ec996;
      }
      &:active {
        background-color: #0da24f;
      }
    }
    // 警告
    &-warning {
      background-color: #f7ba2a;
      &:hover {
        background-color: #edc66c;
      }
      &:active {
        background-color: #c89621;
      }
    }
    // 危险
    &-danger {
      background-color: #ff4949;
      &:hover {
        background-color: #f48080;
      }
      &:active {
        background-color: #cb2121;
      }
    }
    &[disabled] {
      border: 1px solid #d1dbe5;
      background-color: #fff;
      color: #bfcbd9;
      cursor: not-allowed;
    }
  }
</style>
