<template lang="jade">
  .wrap-components
    .ui-components-wrap
      global-button(@click="btnBack")
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
        :mark="'switch'",
        :checked="switchChecked",
        @change="switchChange"
      )
    .ui-components-wrap
      global-slider
</template>

<script>
  require('sass/base.scss')

  export default {
    name: 'its-ui',
    components: {
      'global-button': require('@/components/global/button/normal'),
      'global-collapse': require('@/components/global/collapse/normal'),
      'global-switch': require('@/components/global/switch/normal'),
      'global-slider': require('@/components/global/slider/normal')
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
