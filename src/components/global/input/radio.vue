<template lang="jade">
  .global__radio
    input(
      ref="radio",
      type="radio",
      :name="name",
      :checked="currentChecked",
      @change="check"
    )
    .global__radio-box
      .global__radio-point
</template>

<script>
  export default {
    name: 'global-radio',
    props: {
      name: String,
      mark: [String, Number],
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
      checked (val) {
        this.currentChecked = val
      }
    },
    created () {
      this.currentChecked = this.checked
    },
    methods: {
      check () {
        this.$emit('change', {
          name: this.name,
          mark: this.mark,
          checked: this.$refs.radio.checked
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__radio {
    position: relative;
    display: inline-block;
    width: 12px;
    height: 12px;
    background: none;
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    &-box {
      width: 10px;
      height: 10px;
      border: 1px solid $std_sub_2;
      border-radius: 50%;
      background-color: #fff;
      cursor: pointer;
      text-align: center;
      color: $std_main_A;
      line-height: 12px;
      input:checked+& {
        border: 1px solid $std_main_A;
        .global__radio-point {
          background-color: $std_main_A;
          transform: scale(1);
        }
      }
    }
    &-point {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 1px;
      background-color: #fff;
      transform: scale(0);
      transition: all .2s;
    }
  }
</style>
