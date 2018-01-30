<template lang="jade">
  button.global__btn(
    :class="{['btn--' + type]: true, 'btn--disable': disable}",
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
    props: {
      type: {
        type: String,
        default: 'default' // default, ghost, upload-image
      },
      text: {
        type: String,
        default: '确认'
      },
      disable: Boolean,
      icon: String
    },
    methods: {
      btnClick ($event) {
        this.$emit('click', $event)
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
    .iconfont {
      vertical-align: middle;
    }
    span {
      padding: 0 4px;
    }
  }
</style>
