<template lang="jade">
  .xy__popup-confirm(@click.stop="")
    .xy__popup-confirm_title {{options.title}}
    .xy__popup-confirm_content {{options.content}}
    .xy__popup-confirm_btn
      button.btn-space(@click="submit(1)") 确 认
      button(@click="submit(0)") 取 消
</template>

<script>
  export default {
    name: 'xy_popup_alert',
    props: {
      options: Object
    },
    methods: {
      submit (res) {
        this.$emit('choose', res)
      }
    }
  }
</script>

<style lang="sass">
  .xy__popup {
    &-confirm {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      padding: 10px 20px;
      margin-top: -150px;
      margin-left: -200px;
      background-color: #fff;
      &_title {
        padding: 10px 0 20px 0;
      }
      &_content {
        font-size: 13px;
        padding: 0 20px 20px 20px;
      }
      &_btn {
        text-align: right;
        button {
          padding: 3px 5px;
          color: #fff;
          font-size: 15px;
          background-color:  #5581f5;
          border-radius: 3px;
          cursor: pointer;
          &.btn-space {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
