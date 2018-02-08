<template lang="jade">
  section.global__collapse(
    :class="{ active: currentSpread }"
  )
    .global__collapse-title(
      @click="choose"
    )
      i.iconfont.icon-triangle-r
      span {{title}}
    .global__collapse-ct
      | 展开
</template>

<script>
  export default {
    name: 'global-collapse',
    props: {
      spread: { // 是否展开
        type: Boolean,
        default: false
      },
      title: String
    },
    data () {
      return {
        currentSpread: false
      }
    },
    created () {
      this.currentSpread = this.spread
    },
    methods: {
      choose () {
        this.currentSpread = !this.currentSpread
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__collapse {
    font-size: 12px;
    &-title {
      color: $std_sub_1;
      line-height: 30px;
      cursor: pointer;
      &, .iconfont {
        transition: all .3s;
      }
      .iconfont {
        display: inline-block;
        vertical-align: middle;
        color: $std_sub_2;
        transform: rotate(0);
      }
      .active>& {
        &, .iconfont {
          color: $std_main_A;
        }
        .iconfont {
          transform-origin: 52% center;
          transform: rotate(90deg);
        }
      }
      span {
        padding-left: 3px;
      }
    }
    &-ct {
      display: none;
      .active>& {
        display: block;
      }
    }
  }
</style>
