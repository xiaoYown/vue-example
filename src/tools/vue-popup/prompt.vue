<template lang="jade">
  .xy__popup-wrap(@click.stop="")
    .xy__popup-title {{options.title}}
    .xy__popup-content
      input(type="text",:placeholder="options.placeholder",v-model="val")
    .xy__popup-btn
      button.btn-space(@click="submit(1)") 确 认
      button(@click="submit(0)") 取 消
</template>

<script>
  export default {
    name: 'xy_popup_alert',
    props: {
      options: Object
    },
    data () {
      return {
        val: ''
      }
    },
    methods: {
      submit (status) {
        this.$emit('choose', {
          status: status,
          val: this.val
        })
      }
    }
  }
</script>
