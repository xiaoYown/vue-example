<template lang="jade">
  label.global__input(
    :class="{ 'read-only': readOnly, 'has-icon': icon }",
    :style="style"
  )
    input(
      type="text",
      :placeholder="placeholder",
      v-model="val",
      @input="input",
      @blur="blur",
      @keydown.enter="enter",
      :readOnly="readOnly"
    )
    i.iconfont(
      :class="icon",
      @mousedown.prevent="",
      @click="enter"
    )
</template>

<script>
  function distanceStyle (d) {
    return typeof d === 'number' ? d + 'px' : typeof d === 'string' ? d : ''
  }
  export default {
    name: 'global-text',
    props: {
      name: String,
      value: [String, Number],
      valueType: String, // init, float
      width: [String, Number],
      height: [String, Number],
      placeholder: [String, Number],
      digit: { // float 时使用(保留小数位数)
        type: Number,
        default: 2
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: 'icon-enter'
      }
    },
    computed: {
      style () {
        let width = distanceStyle(this.width)
        let height = distanceStyle(this.height)
        return { width, height }
      }
    },
    data () {
      return {
        val: ''
      }
    },
    watch: {
      value () {
        this.val = this.value
      }
    },
    created () {
      this.val = this.value
    },
    methods: {
      filter () {
        this.val += ''
        if (this.valueType === 'int') { // 整数过滤
          this.val = this.val.replace(/[^\d]+/g, '')
        } else if (this.valueType === 'float') { // 浮点数过滤
          let val = this.val.replace(/[^\d^.]+/g, '')
          let pot = val.match(/\./g)
          let last = 0
          if (pot && pot.length > 1) { // 非 \d\. 字符过滤
            for (let i = 0; i < pot.length - 1; i++) {
              last = val.lastIndexOf('.')
              val = val.substring(0, last) + val.substring(last + 1)
            }
          }
          if (pot) { // 位数保留
            last = val.indexOf('.')
            val = val.substring(0, last + this.digit + 1)
          }
          this.val = val
        }
      },
      input (event) {
        this.filter()
        this.send('input', event)
      },
      enter (event) {
        this.filter()
        this.send('enter', event)
      },
      blur (event) {
        this.filter()
        this.send('blur', event)
      },
      send (evName, event) {
        let val
        if (this.val && this.valueType === 'int') {
          val = parseInt(this.val, 10)
        } else if (this.val && this.valueType === 'float') {
          val = parseFloat(this.val)
        } else {
          val = this.val
        }
        this.$emit(evName, {
          event,
          name: this.name,
          value: val
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__input {
    position: relative;
    display: block;
    height: 32px;
    input {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      border: 1px solid $std_sub_4;
      border-radius: 2px;
      &::-webkit-input-placeholder{
        color: $std_sub_3;
      }
      &:focus {
        border: 1px solid $std_main_A;
      }
      &+.iconfont {
        position: absolute;
        top: 50%;
        right: 10px;
        height: 30px;
        line-height: 30px;
        margin-top: -15px; 
        display: none;
        color: $std_main_A;
        line-height: 30px;
        cursor: pointer;
      }
      &:focus+.iconfont {
        display: block;
      }
    }
    &.read-only input {
      color: $std_sub_3;
      background-color: $std_sub_6;
      border: 1px solid $std_sub_5;
    }
    &.has-icon input {
      &:focus {
        padding-right: 32px;
      }
    }
  }
</style>
