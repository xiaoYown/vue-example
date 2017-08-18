<template lang="jade">
  .modal__wrap
    transition(name="modal-bottom")
      .modal__wrap-content(v-if="start")
        h3.modal__wrap-tip {{ tip }}
        p.modal__wrap-message &nbsp;&nbsp; {{ message }}
        .modal__wrap-btn
          xy-button(
            :size="'small'",
            @click="confirm(true)"
          ) 确定
          xy-button(
            :size="'small'",
            @click="confirm(false)"
          ) 取消
</template>

<script>
  export default {
    components: {
      'xy-button': require('components/button/index.vue')
    },
    props: {
      tip: {
        type: String,
        default: '提示'
      },
      message: {
        type: String,
        default: '是否删除'
      }
    },
    data () {
      return {
        start: false
      }
    },
    mounted () {
      this.start = true
    },
    methods: {
      confirm (bool) {
        this.start = false
        setTimeout(() => {
          this.$emit('confirm', bool)
        }, 200)
      }
    }
  }
</script>

<style lang="sass">
  @import './common.scss';
  .modal__wrap {
    &-content {
      position: absolute;
      top: 50%;
      left: 50%;
      box-sizing: border-box;
      width: 400px;
      padding: 18px;
      margin: -100px 0 0 -200px;
      background-color: #fff;
      border-radius: 5px;
    }
    &-tip {
      color: #000;
      font-weight: bold;
      font-size: 16px;
      padding-bottom: 14px;
    }
    &-message {
      font-size: 14px;
      letter-spacing: 1px;
      padding-bottom: 20px;
    }
    &-btn {
      text-align: right;
      span {
        display: inline-block;
        margin-left: 10px;
        padding: 4px 8px;
        cursor: pointer;
        border-radius: 3px;
        transition: all .2s;
      }
      &_confirm {
        color: #5581f5;
        &:hover {
          color: #fff;
          background-color: #5581f5;
        }
      }
      &_cancel {
        color: #fff;
        background-color: #5581f5;
        &:hover {
          color: #5581f5;
          background-color: #fff;
        }
      }
    }
  }
</style>
