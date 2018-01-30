<template lang="jade">
  section.global__slider
    .global__slider-detail
      h4.global__slider-title 999
      div.global__slider-num(:class="{ focus: focus }")
        input.global__slider-input(
          @focus="onfocus(true)",
          @blur="onfocus(false)"
        )
        span
          i.iconfont.icon-triangle-t
          i.iconfont.icon-triangle-b
    .global__slider-runway
</template>

<script>
  export default {
    props: {
      title: String
    },
    data () {
      return {
        focus: false
      }
    },
    created () {
    },
    methods: {
      onfocus (focus) {
        console.log(focus)
        this.focus = focus
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__slider {
    width: 200px;
    &-detail {
      position: relative;
      height: 22px;
      line-height: 22px;
    }
    &-num {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 48px;
      border: 1px solid $std_sub_4;
      border-radius: 2px;
      input {
        vertical-align: top;
        width: 28px;
        height: 100%;
        padding: 0 2px;
      }
      .iconfont {
        position: absolute;
        right: 0;
        width: 17px;
        overflow: hidden;
        cursor: pointer;
      }
      .icon-triangle-t {
        top: 0;
        bottom: 50%;
        line-height: 14px;
      }
      .icon-triangle-b {
        top: 50%;
        bottom: 0;
        line-height: 10px;
      }
      &.focus {
        border: 1px solid $std_main_A;
        .iconfont {
          background-color: $std_main_A;
          color: #fff;
        }
      }
    }
    &-runway {
      padding-top: 6px;
    }
  }
</style>
