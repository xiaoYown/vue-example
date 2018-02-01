<template lang="jade">
  .wrap-components
    .ui-components-wrap
      global-button(@click="btnBack")
      global-button(:disable="true", :width="200")
      global-button(
        :type="'ghost'",
        :text="'取消'",
        @click="btnBack(1)"
      )
      global-button(
        :text="'上传图片'",
        :icon="'icon-image'",
        @click="btnBack"
      )
    .ui-components-wrap
      global-collapse(
        :title="'文本框'"
      )
    .ui-components-wrap
      span 123
      global-switch(
        :name="'switch'",
        @change="switchChange"
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
      global-text(:width="200",:placeholder="123",@input="textChange",@blur="textChange",:readOnly="false")
    .ui-components-wrap
      global-search(:width="336")
    .ui-components-wrap
      global-search(:type="'ghost'",:width="336")
    .ui-components-wrap
      .color__box-choose
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
      'global-search': require('@/components/global/search/normal')
    },
    data () {
      return {
        switchChecked: false,
        checkboxChecked: true,
        radioChecked: true
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
      switchChange (option) {
        console.log(option)
      },
      textChange (data) {
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
