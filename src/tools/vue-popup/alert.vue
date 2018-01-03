<template lang="jade">
  .xy__popup-wrap(@click.stop="")
    .xy__popup-title {{options.title}}
    .xy__popup-content {{options.content}}
    .xy__popup-btn
      button(@click="close") 确 认
</template>

<script>
  export default {
    name: 'xy_popup_alert',
    props: {
      options: Object
    },
    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>
