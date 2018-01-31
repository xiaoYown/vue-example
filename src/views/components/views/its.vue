<template lang="jade">
  .wrap-components
    .ui-components-wrap
      global-button(@click="btnBack")
      global-button(:disable="true", :width="200")
      global-button(
        :type="'ghost'",
        :text="'取消'",
        @click="btnBack"
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
      global-switch(
        :name="'switch'",
        @change="switchChange"
      )
    .ui-components-wrap
      global-checkbox
    .ui-components-wrap
      // global-radio(:name="'radio'",:checked="true")
      global-radio(:name="'radio'")
      global-radio(:name="'radio'")
    .ui-components-wrap
      global-slider
    .ui-components-wrap
      global-text(:width="200",:placeholder="123")
    .ui-components-wrap
      global-search
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
        switchChecked: false
      }
    },
    methods: {
      btnBack (event) {
        console.log(event.target)
      },
      switchChange (option) {
        console.log(option)
      }
    }
  }
</script>

<style lang="sass">
  .ui-components-wrap {
    padding: 10px;
    .global__btn {
      margin: 0 4px;
    }
  }
</style>
