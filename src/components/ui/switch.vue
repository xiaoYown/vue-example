<template lang="jade">
  label.xy-switch-wrap
    input(type="checkbox",v-model="_open",@change="change",ref="input").xy-switch-input
    span.xy-switch-core
    slot

</template>

<script>
  export default {
    props: {
      open: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        _open: false
      }
    },
    created () {
      this._open = this.open
    },
    methods: {
      change () {
        this.$emit('open-change', this.$refs.input.checked)
      }
    }
  }
</script>

<style lang="sass">
  .xy-switch-core{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 26px;
    height: 15px;
    border: 1px solid #bbb;
    border-radius: 7px;
    box-sizing: border-box;
    background-color: #fff;
    cursor: pointer;
    transition: background-color .3s;
    &:before{
      content: " ";
      position: absolute;
      z-index: 1;
      width: 24px;
      height: 13px;
      border-radius: 6px;
      background-color: #fdfdfd;
      transition: transform .3s;
    }
    &:after{
      content: " ";
      position: absolute;
      left: 0;
      z-index: 2;
      display: inline-block;
      vertical-align: top;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 0 3px rgba(0,0,0,.4);
      transition: left .3s;
    }
  }
  .xy-switch-input{
    display: none;
    &:checked{
      &+.xy-switch-core{
        text-align: right;
        border: 1px solid #3b6ae1;
        background-color: #3b6ae1;
        &:before{
            transform: scale(0);
        }
        &:after{
            left: 11px;
        }
      }
    }
  }

</style>
