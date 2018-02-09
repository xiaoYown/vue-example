<template lang="jade">
  .wrap-components
    .ui-components-wrap
      global-button(
        @click="btnBack"
      )
      global-button(
        :disable="true",
        :width="200",
        :height="36"
      )
      global-button(
        :type="'ghost'",
        :text="'取消'",
        :height="40",
        :width="200",
        :icon="'icon-image'",
        @click="btnBack(1)"
      )
      global-button(
        :text="'上传图片'",
        :icon="'icon-image'",
        @click="btnBack"
      )
      global-button(
        :type="'fill'",
        :text="'上传图片'",
        :icon="'icon-image'",
        @click="btnBack"
      )
    .ui-components-wrap
      global-collapse(
        :title="'文本框'"
      )
    .ui-components-wrap
      // global-switch(
      //   :name="'switch'",
      //   @change="change"
      // )
      global-switch(
        :name="'switch'",
        :checked="true",
        @change="change"
      )
    .ui-components-wrap
      global-checkbox(:checked="checkboxChecked")
    .ui-components-wrap
      // global-radio(:name="'radio'",:checked="true")
      global-radio(:name="'radio'",:checked="radioChecked")
      global-radio(:name="'radio'")
    .ui-components-wrap
      global-slider
    .ui-components-wrap
      global-text(
        :width="200",
        :placeholder="123",
        @input="change",
        @blur="change",
        :readOnly="false"
      )
    .ui-components-wrap
      global-search(
        :name="'normal'",
        :width="336",
        @input="change",
        @enter="change",
        @search="change"
      )
    .ui-components-wrap
      global-search(
        :type="'ghost'",
        :name="'ghost'",
        :width="336",
        @input="change",
        @enter="change",
        @search="change"
      )
    .ui-components-wrap
      global-select(:width="160",:zIndex="10",:selected="selected",@select="change",:list="selectList")
</template>

<script>
  require('sass/base.scss')

  export default {
    name: 'its-ui',
    components: {
      'global-button': require('@/components/global/button/normal'),
      'global-collapse': require('@/components/global/collapse/normal'),
      'global-switch': require('@/components/global/switch/normal'),
      'global-slider': require('@/components/global/slider/normal'),
      'global-checkbox': require('@/components/global/input/checkbox'),
      'global-radio': require('@/components/global/input/radio'),
      'global-text': require('@/components/global/input/text'),
      'global-search': require('@/components/global/search/normal'),
      'global-select': require('@/components/global/select/normal')
    },
    data () {
      return {
        switchChecked: false,
        checkboxChecked: true,
        radioChecked: true,
        selected: '1',
        selectList: [
          {
            id: '1',
            txt: '11'
          }, {
            id: '2',
            txt: '22'
          }, {
            id: '3',
            txt: '33'
          }, {
            id: '4',
            txt: '44'
          }
        ]
      }
    },
    methods: {
      btnBack (event) {
        this.checkboxChecked = !this.checkboxChecked

        this.$tip({
          type: event === 1 ? 'success' : 'fail',
          text: ['操作失败涉及到法律开始大幅离开的时间发；莱卡时间的离开房间的撒快乐；发生的纠纷快乐是的放假啊是；蝶恋蜂狂']
        })
      },
      change (data) {
        if (data.id) {
          this.selected = data.id
        }
        console.log(data)
      }
    }
  }
</script>

<style lang="sass">
  .ui-components-wrap {
    padding: 10px;
    line-height: 30px;
    .global__btn {
      margin: 0 4px;
    }
    .color__box-choose {
      width: 12px;
      height: 12px;
      display: inline-block;
      vertical-align: middle;
      border-radius: 3px;
      box-shadow: 0 0 2px #999 inset;
      cursor: pointer;
    }
  }
</style>
