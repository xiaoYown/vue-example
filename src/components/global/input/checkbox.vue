<template lang="jade">
  button.global__checkbox(
    :class="{ checked: currentChecked }",
    @click="check"
  )
    .global__checkbox-box(:class="{ disable: disable }")
      .global__checkbox-animation
        i.iconfont &#xe613;
</template>

<script>
  export default {
    name: 'global-checkbox',
    props: {
      name: String,
      index: Number,
      disable: {
        type: Boolean,
        default: false
      },
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
      prevent (event) { // disable 状态下禁止 disable 状态改变
        if (this.disable) {
          event.preventDefualt()
        }
      },
      check () {
        if (!this.disable) {
          this.currentChecked = !this.currentChecked
        }
        this.$emit('change', {
          name: this.name,
          index: this.index,
          checked: this.currentChecked
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '~@/assets/sass/theme';

  .global__checkbox {
    display: inline-block;
    width: 12px;
    height: 12px;
    &.checked &-box {
      border-color: $std_main_A;
      .global__checkbox-animation {
        width: 100%;
      }
      .iconfont {
        color: $std_main_A;
      }
    }
    &-box {
      width: 11px;
      height: 11px;
      border: 1px solid $std_sub_2;
      border-radius: 2px;
      background-color: #fff;
      cursor: pointer;
      text-align: center;
      color: $std_main_A;
      line-height: 12px;
      &.disable {
        border-color: $std_sub_4 !important;
        .iconfont {
          color: $std_sub_4 !important;
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
        font-size: 12px;
      }
    }
  }
</style>
