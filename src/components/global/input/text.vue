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
      @keydown.13="enter",
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
      width: [String, Number],
      height: [String, Number],
      placeholder: [String, Number],
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
      input (event) {
        this.send('input', event)
      },
      enter (event) {
        this.send('enter', event)
      },
      blur (event) {
        this.send('blur', event)
      },
      send (evName, event) {
        this.$emit(evName, {
          event,
          name: this.name,
          value: this.val
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
      border: 1px solid $std_sub_5;
      border-radius: 2px;
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
      padding-right: 32px;
    }
  }
</style>
