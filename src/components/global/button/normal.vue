<template lang="jade">
  button.global__btn(
    :class="{['btn--' + type]: true, 'btn--disable': disable}",
    :style="style",
    @click="btnClick"
  )
    .global__btn-shadow(v-if="/default|fill/.test(type)")
    i.iconfont.icon-loading(
      v-if="loading"
    )
    i.iconfont(
      v-else-if="icon",
      :class="icon"
    )
    span {{text}}
</template>

<script>
  function distanceStyle (d) {
    return typeof d === 'number' ? d + 'px' : typeof d === 'string' ? d : ''
  }

  export default {
    name: 'global-button',
    props: {
      type: {
        type: String,
        default: 'default' // default, ghost, fill
      },
      text: {
        type: String,
        default: '确认'
      },
      loading: Boolean,
      width: {
        type: [Number, String],
        default: 85
      },
      height: [Number, String],
      disable: Boolean,
      icon: String
    },
    computed: {
      style () {
        let width = distanceStyle(this.width)
        let height = distanceStyle(this.height)
        return { width, height }
      }
    },
    methods: {
      btnClick ($event) {
        if (!this.disable) {
          this.$emit('click', $event)
        }
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__btn {
    position: relative;
    display: inline-block;
    overflow: hidden;
    height: 28px;
    border-radius: 2px;
    text-align: center;
    font-size: 0;
    cursor: pointer;
    transition: all .1s;
    // 边框按钮
    &.btn--ghost {
      border: 1px solid $std_main_A;
      background-color: #fff;
      &, .iconfont {
        color: $std_main_A;
      }
      &:hover {
        & {
          border: 1px solid $std_main_B;
          &, .iconfont {
            color: $std_main_B;
          }
        }
      }
      &:active {
        & {
          border: 1px solid $std_main_C;
          &, .iconfont {
            color: $std_main_C;
          }
        }
      }
    }
    // 默认按钮
    &.btn--default {
      border: 1px solid $std_main_A;
      background-color: $std_main_A;
      &, .iconfont {
        color: #fff;
      }
      &:hover {
        border: 1px solid $std_main_B;
        background-color: $std_main_B;
      }
      // 阴影
      &, &:active {
        box-shadow: 0 2px 2px 0 rgba($std_main_G, .14), 0 3px 1px -2px rgba($std_main_G, .2), 0 1px 5px 0 rgba($std_main_G, .12);
      }
      &:hover,
      &:active {
        box-shadow: 0 14px 26px 0 rgba($std_main_G, .2), 0 4px 10px 0 rgba($std_main_G, .8), 0 8px 2px -5px rgba($std_main_G, 1);
      }
    }
    // 边框 -> 默认 按钮
    &.btn--fill {
      border: 1px solid $std_sub_3;
      background-color: #fff;
      &, .iconfont {
        color: $std_sub_2;
      }
      &:hover {
        background-color: $std_main_B;
        border: 1px solid $std_main_B;
        &, & .iconfont {
          color: #fff;
        }
      }
    }
    &.btn--default,
    &.btn--fill {
      // 点击闪烁
      & .global__btn-shadow {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        transform: scale(0);
        background-color: $std_main_A;
        border-radius: 15px;
      }
      &:active .global__btn-shadow {
        transform: scale(1.6);
        transition: transform .3s ease-in-out;
      }
    }
    // 禁止
    &.btn--disable {
      .global__btn-shadow {
        display: none;
      }
    }
    &.btn--disable,
    &.btn--disable:hover {
      border: 1px solid $std_sub_4;
      background-color: $std_sub_4;
      color: $std_sub_2;
      cursor: not-allowed;
      border: none;
      box-shadow: none;
    }
    // 加载中
    @keyframes btn-loading {
      from { transform: rotate(0); }
      to { transform: rotate(360deg); }
    }
    .icon-loading {
      width: 17px;
      height: 17px;
      animation: btn-loading 1s linear infinite;
    }
    .iconfont {
      display: inline-block;
      position: relative;
      vertical-align: top;
      z-index: 1;
    }
    span {
      position: relative;
      z-index: 1;
      padding: 0 4px;
      font-size: 12px;
    }
  }
</style>
