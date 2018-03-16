<template lang="jade">
  .wrap-components
    .ui-components-wrap
      global-btn(
        @click="btnBack"
      )
      global-btn(
        :loading="loading",
        @click="loading = !loading"
      )
      global-btn(
        :disable="true",
        :width="200",
        :height="36"
      )
      global-btn(
        :type="'ghost'",
        :text="'取消'",
        :height="40",
        :width="200",
        :icon="'icon-image'",
        @click="btnBack(1)"
      )
      global-btn(
        :text="'上传图片'",
        :icon="'icon-image'",
        @click="btnBack"
      )
      global-btn(
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
      label
        global-checkbox(:checked="checkboxChecked")
        span 123
      label
        global-checkbox(:checked="true",:disable="true")
        span 234
    .ui-components-wrap
      // global-radio(:name="'radio'",:checked="true")
      label
        global-radio(:mark="1",:name="'radio'",:checked="radioChecked",@change="change")
        span 123
      label
        global-radio(:mark="2",:name="'radio'",@change="change")
        span 234
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
      global-select(
        :type="'line'",
        :width="200",
        :selected="selectStyle",
        :zIndex="9",
        @select="change"
      )
    .ui-components-wrap
      global-select(
        :width="200",
        :zIndex="10",
        :selected="selected",
        :list="selectList",
        @select="change"
      )
    .ui-components-wrap
      p-add-condition(
        :zIndex="10"
      )
    .ui-components-wrap
      global-select-input(
        :zIndex="11",
        :width="200",
        :list="selectList",
        @select="change",
        @enter="change"
      )
    .ui-components-wrap
      global-select-input(
        :zIndex="10",
        :width="200",
        :list="selectList",
        :value="10",
        :txtKey="'name'",
        :selected="selected",
        @select="change"
      )
    
</template>

<script>
  require('sass/base.scss')

  async function getWebUploader () {
    let w = await require.ensure([], (require) => require('webuploader'), 'webuploader')
    return w
  }

  export default {
    name: 'its-ui',
    components: {
      'p-add-condition': require('../mixin/addCondition')
    },
    data () {
      return {
        loading: false,
        switchChecked: false,
        checkboxChecked: true,
        radioChecked: true,
        selectInputVal: 10,
        selected: '1',
        selectStyle: 'solid',
        selectList: [
          {
            id: '1',
            name: '11',
            txt: '11'
          }, {
            id: '2',
            name: '22',
            txt: '22'
          }, {
            id: '3',
            name: '33',
            txt: '33'
          }, {
            id: '4',
            name: '44',
            txt: '444444444444444444444444444444444'
          }
        ]
      }
    },
    created () {
      getWebUploader().then(WebUploader => {
        // console.log(WebUploader)
      })
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
          if (/solid|dashed|dotted/.test(data.id)) {
            this.selectStyle = data.id
          }
        }
        // select input test
        // if (true) {

        // }
        console.log(data)
      }
    }
  }
</script>

<style lang="sass">
  .ui-components-wrap {
    position: relative;
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
