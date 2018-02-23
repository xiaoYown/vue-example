<template lang="jade">
  button.global__checkbox
    label
      input(
        ref="checkbox",
        type="checkbox",
        :name="name",
        :checked="currentChecked",
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
    data () {
      return {
        currentChecked: false
      }
    },
    created () {
      this.currentChecked = this.checked
    },
    watch: {
      checked (val) {
        this.currentChecked = val
      }
    },
    methods: {
      check () {
        this.currentChecked = this.$refs.checkbox.checked
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
        .iconfont {
          color: $std_main_A;
        }
      }
      .iconfont {
        font-size: 16px;
      }
    }
    &-animation {
      width: 0;
      overflow: hidden;
      transition: all .2s; 
      .iconfont {
        position: relative;
        vertical-align: top;
        margin-left: -1px;
        font-size: 12px;
      }
    }
  }
</style>
