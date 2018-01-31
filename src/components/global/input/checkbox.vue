<template lang="jade">
  button.global__checkbox
    label
      input(
        ref="checkbox",
        type="checkbox",
        :name="name",
        @change="check"
      )
      .global__checkbox-box
        .global__checkbox-animation
          i.iconfont &#xe613;
</template>

<script>
  export default {
    name: 'global-checkbox',
    props: {
      name: String,
      checked: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      check () {
        this.$emit('change', {
          name: this.name,
          checked: this.$refs.checkbox.checked
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__checkbox {
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    label {
      display: block;
      width: 100%;
      height: 100%;
    }
    input {
      display: none;
    }
    &-box {
      width: 10px;
      height: 10px;
      border: 1px solid $std_sub_2;
      border-radius: 2px;
      background-color: #fff;
      cursor: pointer;
      text-align: center;
      color: $std_main_A;
      line-height: 12px;
      input:checked+& {
        border: 1px solid $std_main_A;
        .global__checkbox-animation {
          width: 100%;
        }
      }
      // .iconfont {
      //   display: inline-block;
      // }
      // .iconfont {
      //   display: none;
      //   margin-left: -2px;
      // }
    }
    &-animation {
      width: 0;
      overflow: hidden;
      transition: all .2s; 
      .iconfont {
        position: relative;
        font-size: 12px;
        margin-left: -1px;
      }
    }
  }
</style>
