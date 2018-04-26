<template lang="jade">
  section.p-select_input(
    :class="{ selecting: isShow }",
    :style="wrapStyle"
  )
    .p-select_input-checked
      .main-txt
        p {{ txtShow }}
        .p-select_input-tip(v-show="type === 1") 系统
      i.iconfont.icon-triangle-b
      .p-select_input-control(
        ref="control",
        @mousedown="show('switch')"
      )
    .p-select_input-wrap(
      :style="{ zIndex: zIndex }",
      @mousedown.stop=""
    )
      h4.p-select_input-title {{ title1 }}：
      .p-select_input-input
        global-text(
          :value="val",
          :placeholder="placeholder2",
          @enter="enter",
          @input="input"
        )
      h4.p-select_input-title {{ title2 }}：
      ul.p-select_input-list.scroll__bar-4
        li.p-select_input-option(
          v-for="option, index in list",
          :key="index",
          @click="select(1, index, option)"
        ) 
          .p-select_input-system
            .p-select_input-val
              .inner {{ option[txtKey] }}
            .p-select_input-tip 系统
        li.p-select_input-option(
          v-for="option, index in customList",
          :key="index",
          @click="select(2, index, option)"
        )
          .p-select_input-custom
            .p-select_input-val
              p.inner {{ option[customKey] }}
          span.sub-txt {{ option[customSubKey] }}

</template>

<script>
  export default {
    name: 'select-input',
    props: {
      mark: [String, Number],
      width: [Number, String],
      type: Number,
      zIndex: Number,
      list: Array,
      customList: Array,
      value: [Number, String],
      txtKey: {
        type: String,
        default: 'txt'
      },
      customKey: {
        type: String,
        default: 'txt'
      },
      customSubKey: {
        type: String,
        default: 'txtSub'
      },
      selectKey: { // 以此参数作为 被选中选项判断依据 key
        type: String,
        default: 'id'
      },
      placeholder1: {
        type: String,
        default: '请选择'
      },
      placeholder2: {
        type: String,
        default: '在此输入条件'
      },
      title1: {
        type: String,
        default: '输入条件'
      },
      title2: {
        type: String,
        default: '参数条件'
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
      value () {
        this.setTxt()
      }
    },
    data () {
      return {
        val: '',
        isShow: false,
        txtShow: ''
      }
    },
    created () {
      this.setTxt()
      window.addEventListener('mousedown', this.close, false)
    },
    beforeDestroy () {
      window.removeEventListener('mousedown', this.close, false)
    },
    methods: {
      setTxt () {
        this.val = this.value || ''
        this.txtShow = this.value || '请选择'
      },
      close (event) { // 点击下拉框外部时直接进行隐藏
        if (event.target !== this.$refs.control) { // 点击目标元素非自身时进行隐藏
          this.show(false)
        }
      },
      show (bool) { // 控制隐藏与显示
        if (bool === 'switch') {
          this.isShow = !this.isShow
        } else {
          this.isShow = bool
        }
      },
      input (data) { // 当前 val 赋值
        this.val = data.value
      },
      select (type, index, option) { // 选择下拉, 回传 name, index 以及所有该选项属性
        this.show(false)
        this.txtShow = this.val = option[this.txtKey]
        this.$emit('select', {
          type,
          index,
          mark: this.mark,
          ...option
        })
      },
      enter () { // keydown enter 时, 以及点击完成时回传
        this.show(false)
        this.txtShow = this.val
        this.$emit('enter', {
          type: 0,
          value: this.val,
          mark: this.mark
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .p-select_input {
    position: relative;
    font-size: 12px;
    line-height: normal;
    &-checked {
      position: relative;
      height: 24px;
      padding: 0 22px 0 13px;
      background-color: #fff;
      border: 1px solid $std_sub_4;
      border-radius: 2px;
      color: $std_sub_1;
      line-height: 24px;
      cursor: pointer;
      font-size: 0;
      .main-txt {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        max-width: 100%;
        padding-right: 30px;
        font-size: 12px;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-all;
        }
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
      .selecting & {
        z-index: 2;
        border: 1px solid $std_main_A;
        .iconfont {
          color: $std_main_A;
        }
      }
    }
    &-control {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    &-wrap {
      position: absolute;
      top: 27px;
      right: 0;
      left: 0;
      display: none;
      padding: 15px 0;
      border: 1px solid $std_sub_4;
      border-radius: 2px;
      background-color: #fff;
      box-shadow: 0 1px 3px 0 rgba($std_sub_3, .6);
      .selecting & {
        display: block;
      }
    }
    &-title {
      padding: 0 15px 10px 15px;
    }
    &-input {
      position: relative;
      height: 32px;
      padding: 0 30px 15px 30px;
      line-height: 32px;
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
      &:hover {
        background-color: $std_sub_5;
      }
    }
    &-system {
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      padding-right: 30px;
      max-width: 100%;
    }
    &-custom {
      display: inline-block;
      vertical-align: top;
      max-width: 60%;
    }
    .sub-txt {
      color: $std_sub_2;
    }
    &-val {
      position: relative;
      padding: 0 4px;
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        content: "[";
        display: inline;
      }
      &:after {
        position: absolute;
        top: 0;
        right: 0;
        content: "]";
        display: inline;
      }
      .inner {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &-tip {
      position: absolute;
      top: 50%;
      right: 0;
      width: 32px;
      height: 16px;
      margin-top: -8px;
      color: #fff;
      line-height: 16px;
      text-align: center;
      border-radius: 2px;
      background-color: $std_main_A;
      transform: scale(.8);
      transform-origin: 100% 50%;
    }
  }
</style>
