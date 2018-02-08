<template lang="jade">
  button.global__btn(
    :class="{['btn--' + type]: true, 'btn--disable': disable}",
    :style="{ width: width + 'px' }",
    @click="btnClick"
  )
    .global__btn-shadow(v-if="type === 'default'")
    i.iconfont(
      v-if="icon",
      :class="icon"
    )
    span {{text}}
</template>

<script>
  export default {
    name: 'global-button',
    props: {
      type: {
        type: String,
        default: 'default' // default, ghost
      },
      text: {
        type: String,
        default: '确认'
      },
      width: Number,
      disable: Boolean,
      icon: String
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
    vertical-align: middle;
    overflow: hidden;
    min-width: 85px;
    height: 30px;
    border-radius: 2px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    transition: all .2s;
    // 边框按钮
    &.btn--ghost {
      border: 1px solid $std_main_A;
      background-color: #fff;
      color: $std_main_A;
      &:hover {
        color: $std_main_B;
        border: 1px solid $std_main_B;
      }
      &:active {
        color: $std_main_C;
        border: 1px solid $std_main_C;
      }
    }
    // 默认按钮
    &.btn--default {
      background-color: $std_main_A;
      color: #fff;
      &:hover {
        background-color: $std_main_B;
      }
      // 点击闪烁
      & .global__btn-shadow {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        transform: scale(0);
        transition: transform .3s ease-in-out;
        background-color: $std_main_A;
        border-radius: 15px;
      }
      &:active .global__btn-shadow {
        transform: scale(1.6);
      }
      // 阴影
      &:hover,
      &:active {
        box-shadow: 0 5px 6px $std_main_G;
      }
    }
    &.btn--disable {
      .global__btn-shadow {
        display: none;
      }
    }
    &.btn--disable,
    &.btn--disable:hover {
      background-color: $std_sub_4;
      color: $std_sub_2;
      cursor: not-allowed;
      border: none;
      box-shadow: none;
    }
    .iconfont {
      position: relative;
      vertical-align: middle;
      z-index: 1;
    }
    span {
      position: relative;
      z-index: 1;
      padding: 0 4px;
    }
  }
</style>
