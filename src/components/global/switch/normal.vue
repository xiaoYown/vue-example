<template lang="jade">
  section.global__switch(
    :class="{ checked: currentChecked }",
    @click="check"
  )
    i.global__switch-point
    span.global__switch-on
    span.global__switch-off
</template>

<script>
  export default {
    props: {
      mark: String,
      checked: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentChecked: false
      }
    },
    created () {
      this.currentChecked = this.checked
    },
    methods: {
      check () {
        let data

        this.currentChecked = !this.currentChecked

        if (this.mark) {
          data = {
            mark: this.mark,
            checked: this.currentChecked
          }
        } else {
          data = this.checked
        }
        this.$emit('change', data)
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__switch {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    border-radius: 6px;
    width: 23px;
    height: 10px;
    border: 1px solid $std_sub_2;
    cursor: pointer;
    transition: all .2s;
    &.checked {
      border: 1px solid $std_main_A;
      background-color: $std_main_A;
    }
    &-point {
      position: absolute;
      top: 1px;
      left: 2px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $std_sub_2;
      transition: all .2s;
      .checked>& {
        left: 13px;
        background-color: #fff;
      }
    }
  }
</style>
