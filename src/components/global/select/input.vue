<template lang="jade">
  section.p-cdt__select(
    :class="{ selecting: isShow }",
    :style="wrapStyle"
  )
    .p-cdt__select-checked
      span {{ txtShow }}
      i.iconfont.icon-triangle-b
      .p-cdt__select-control(
        ref="control",
        @mousedown="show('switch')"
      )
    .p-cdt__select-wrap(
      :style="{ zIndex: zIndex }",
      @mousedown.stop=""
    )
      h4.p-cdt__select-title {{ title1 }}：
      .p-cdt__select-input
        global-text(
          :value="val",
          :icon="''",
          :placeholder="placeholder2",
          @enter="enter",
          @blur="",
          @input="input"
        )
        span(:class="{ active: val }",@click="enter") 完成
      h4.p-cdt__select-title {{ title2 }}：
      ul.p-cdt__select-list.scroll__bar-4
        li.p-cdt__select-option(
          v-for="option, index in list",
          :key="index",
          @click="select(option, index)"
        ) {{ option.txt }}

</template>

<script>
  export default {
    name: 'select-input',
    components: {
      'global-text': require('@/components/global/input/text')
    },
    props: {
      name: String,
      width: [Number, String],
      zIndex: Number,
      list: Array,
      value: [Number, String],
      txtKey: {
        type: String,
        default: 'txt'
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
      window.addEventListener('mousedown', this.hide, false)
    },
    beforeDestroy () {
      window.removeEventListener('mousedown', this.hide, false)
    },
    methods: {
      setTxt () {
        this.val = this.value || ''
        this.txtShow = this.value || '请选择'
      },
      hide (event) { // 点击下拉框外部时直接进行隐藏
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
      select (option, index) { // 选择下拉, 回传 name, index 以及所有该选项属性
        // this.txtShow = option[this.txtKey]
        this.show(false)
        this.$emit('select', {
          ...option,
          index,
          name: this.name
        })
      },
      enter () { // keydown enter 时, 以及点击完成时回传
        this.show(false)
        // this.txtShow = this.val || '请选择'
        this.$emit('enter', {
          value: this.val,
          name: this.name
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .p-cdt__select {
    position: relative;
    font-size: 12px;
    line-height: normal;
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
      padding: 0 54px 15px 24px;
      line-height: 32px;
      span {
        position: absolute;
        top: 0;
        right: 15px;
        width: 36px;
        color: $std_sub_3;
        text-align: center;
        cursor: pointer;
        &.active {
          color: $std_main_A;
        }
      }
    }
    // &-value {
    //   height: 30px;
    //   width: 100%;
    //   padding: 0 9px;
    //   border: 1px solid $std_sub_4;
    //   font-size: 12px;
    // }
    &-list {
      max-height: 90px;
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
