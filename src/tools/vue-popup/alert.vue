<template lang="jade">
  .xy__popup-alert(@click.stop="")
    .xy__popup-alert_title {{options.title}}
    .xy__popup-alert_content {{options.content}}
    .xy__popup-alert_btn
      button(@click="close") 确 认
</template>

<script>
  export default {
    name: 'xy_popup_alert',
    props: {
      options: Object
    },
    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="sass">
  .xy__popup {
    &-alert {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      padding: 20px;
      margin-top: -150px;
      margin-left: -200px;
      background-color: #fff;
      &_title {
        padding-bottom: 20px;
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
        }
      }
    }
  }
</style>
