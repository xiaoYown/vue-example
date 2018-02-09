<template lang="jade">
  section.global__select(
    :class="{ selecting: isFocus }",
    :style="wrapStyle"
  )
    .global__select-checked(@mousedown="focus(false)") {{ selectedTxt }}
      i.iconfont.icon-triangle-b
    input.global__select-focus(
      @click="focus(true)"
      @focus="focus(true)",
      @blur="focus(false)"
    )
    .global__select-options
      ul.global__select-list.scroll__bar-4
        li.global__select-option(
          v-for="option, index in list"
          @mousedown="select(option, index)"
        ) {{ option.txt }}

</template>

<script>
  export default {
    name: 'global-select',
    props: {
      name: String,
      width: [Number, String],
      zIndex: Number,
      list: Array,
      selected: String,
      type: {
        type: String,
        default: 'normal'
      },
      placeholder: {
        type: String,
        default: '请选择'
      }
    },
    computed: {
      wrapStyle () {
        let type = typeof this.width
        return {
          width: type === 'number' ? this.width + 'px' : type === 'string' ? this.width : '',
          zIndex: this.zIndex
        }
      }
    },
    watch: {
      selected () {
        this.getSelectedTxt()
      }
    },
    data () {
      return {
        isFocus: false,
        selectedTxt: ''
      }
    },
    created () {
      this.selectedTxt = this.placeholder
      this.getSelectedTxt()
    },
    methods: {
      getSelectedTxt () {
        for (let i = 0, len = this.list.length; i < len; i++) {
          if (this.selected === this.list[i].id) {
            this.selectedTxt = this.list[i].txt
            break
          }
        }
      },
      focus (bool) {
        this.isFocus = bool
      },
      select (option, index) {
        this.selectedTxt = option.txt
        this.focus(false)

        this.$emit('select', {
          ...option,
          index,
          name: this.name
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__select {
    position: relative;
    &-checked {
      position: relative;
      height: 24px;
      padding: 0 22px 0 13px;
      background-color: #fff;
      overflow: hidden;
      border: 1px solid $std_sub_4;
      border-radius: 2px;
      color: $std_sub_1;
      line-height: 26px;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
      cursor: pointer;
      .iconfont {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 22px;
        color: $std_sub_2;
        text-align: center;
      }
      .global__select:hover,
      .selecting & {
        z-index: 2;
        border: 1px solid $std_main_A;
        .iconfont {
          color: $std_main_A;
        }
      }
    }
    &-focus {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      background-color: rgba(255, 255, 255, 0);
      color: transparent;
      cursor: pointer;
    }
    &-options {
      position: absolute;
      top: 27px;
      right: 0;
      left: 0;
      display: none;
      padding: 13px 0;
      border: 1px solid $std_sub_4;
      border-radius: 2px;
      background-color: #fff;
      .selecting & {
        display: block;
      }
    }
    &-list {
      max-height: 240px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    &-option {
      height: 30px;
      padding: 0 20px;
      line-height: 30px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background-color: $std_sub_5;
      }
    }
  }
</style>
