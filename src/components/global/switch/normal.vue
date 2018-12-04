<template lang="jade">
  section.global__switch(
    :class="{ checked: currentChecked }",
    @click="check"
  )
    i.global__switch-point
</template>

<script>
  export default {
    name: 'global-switch',
    props: {
      name: String,
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
    watch: {
      checked () {
        this.currentChecked = this.checked
      }
    },
    created () {
      this.currentChecked = this.checked
    },
    methods: {
      check () {
        let data

        this.currentChecked = !this.currentChecked

        if (this.name) {
          data = {
            name: this.name,
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
  @import '~@/assets/sass/theme';

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
    &:before {
      content: "";
      position: absolute;
      top: 1px;
      left: 2px;
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      opacity: 0;
      transform: scale(3);
      transition: all .1s ease-in-out;
    }
    &:active:before {
      opacity: 1;
      background-color: rgba($std_sub_2, .2);
    }
    &.checked {
      border: 1px solid $std_main_A;
      background-color: $std_main_A;
      &:before {
        left: 13px;
      }
      &:active:before {
        background-color: rgba($std_main_A, .2);
      }
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
