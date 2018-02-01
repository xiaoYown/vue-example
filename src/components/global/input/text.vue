<template lang="jade">
  label.global__input(
    :class="{ 'read-only': readOnly, 'has-icon': icon }",
    :style="{ width: width + 'px' }"
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
  export default {
    name: 'global-text',
    props: {
      name: String,
      value: [String, Number],
      width: Number,
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
        top: 1px;
        right: 10px;
        bottom: 1px;
        display: none;
        color: $std_main_A;;
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
