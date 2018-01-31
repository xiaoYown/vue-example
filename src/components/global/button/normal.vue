<template lang="jade">
  button.global__btn(
    :class="{['btn--' + type]: true, 'btn--disable': disable}",
    :style="{ width: width + 'px' }",
    @click="btnClick"
  )
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
    display: inline-block;
    vertical-align: middle;
    min-width: 85px;
    height: 30px;
    border-radius: 2px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
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
      &:active {
        background-color: $std_main_C;
      }
    }
    &.btn--disable,
    &.btn--disable:hover {
      background-color: $std_sub_4;
      color: $std_sub_2;
      cursor: not-allowed;
    }
    .iconfont {
      vertical-align: middle;
    }
    span {
      padding: 0 4px;
    }
  }
</style>
