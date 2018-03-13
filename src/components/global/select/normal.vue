<template lang="jade">
  section.global__select(
    :class="{ selecting: isFocus, 'line--choose': type === 'line' }",
    :style="wrapStyle"
  )
    .global__select-checked(
      @mousedown="focus(false)"
    )
      .global__select-line(
        v-if="/solid|dashed|dotted/.test(selectedShow)",
        :style="{'border-top-style': selectedShow }"
      )
      span(v-else) {{ selectedShow }}
      i.iconfont.icon-triangle-b
    label.global__select-focus
      input(
        @click="focus(true)"
        @focus="focus(true)",
        @blur="focus(false)"
      )
    .global__select-options(:style="{ zIndex: zIndex }")
      ul.global__select-list.scroll__bar-4(v-if="type === 'line'")
        li.global__select-option(
          v-for="option, index in lineList",
          :key="index",
          @mousedown="select(option, index)"
        )
          .global__select-line(:style="{'border-top-style': option[selectKey] }")
      ul.global__select-list.scroll__bar-4(v-else="type === 'normal'")
        li.global__select-option(
          v-for="option, index in list",
          :key="index",
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
      selected: [Number, String],
      selectKey: { // 以此参数作为 被选中选项判断依据 key
        type: String,
        default: 'id'
      },
      type: {
        type: String,
        default: 'normal' // line
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
          width: type === 'number' ? this.width + 'px' : type === 'string' ? this.width : ''
        }
      }
    },
    watch: {
      selected () {
        this.getSelectedShow()
      },
      list () {
        this.getSelectedShow()
      }
    },
    data () {
      return {
        isFocus: false,
        selectedShow: '',
        lineList: [{
          id: 'solid',
          txt: 'solid'
        }, {
          id: 'dashed',
          txt: 'dashed'
        }, {
          id: 'dotted',
          txt: 'dotted'
        }]
      }
    },
    created () {
      this.getSelectedShow()
    },
    methods: {
      getSelectedShow () {
        let list = this.type === 'line' ? this.lineList : this.list
        this.selectedShow = this.placeholder

        for (let i = 0, len = list.length; i < len; i++) {
          if (this.selected === list[i][this.selectKey]) {
            this.selectedShow = list[i].txt
            break
          }
        }
      },
      focus (bool) {
        this.isFocus = bool
      },
      select (option, index) {
        this.selectedShow = option.txt
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
    font-size: 12px;
    &-checked {
      position: relative;
      height: 24px;
      padding: 0 22px 0 13px;
      background-color: #fff;
      overflow: hidden;
      border: 1px solid $std_sub_4;
      border-radius: 2px;
      color: $std_sub_1;
      line-height: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
      cursor: pointer;
      font-size: 0;
      span {
        font-size: 12px;
      }
      .iconfont {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 22px;
        color: $std_sub_2;
        text-align: center;
        font-size: 18px;
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
      input {
        height: 0;
        width: 0;
      }
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
      box-shadow: 0 1px 3px 0 rgba($std_sub_3, .6);
      .selecting & {
        display: block;
      }
    }
    &-list {
      max-height: 180px;
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
      .line--choose & {
        height: 26px;
        line-height: 26px;
      }
      &:hover {
        background-color: $std_sub_5;
      }
    }
    &-line {
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      border-top-width: 1px;
      border-top-color: $std_sub_2;
    }
  }
</style>
