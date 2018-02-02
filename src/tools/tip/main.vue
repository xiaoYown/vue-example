<template lang="jade">
  transition(name="fade")
    .plugin__tip(
      v-show="type",
      @click="close",
      :style=""
    )
      transition(name="tip-bottom")
        .plugin__tip-box(v-show="tipType")
          ul.plugin__tip-ct(:class="'plugin__tip-' + type")
            li(
              v-for="txt, index in text",
              :key="index"
            ) {{txt}}
</template>

<script>
  require('./main.scss')

  export default {
    name: 'plugin-tip',
    data () {
      return {
        type: '',
        tipType: '',
        text: [],
        timer: null,
        time: 2000
      }
    },
    methods: {
      show (options) {
        this.type = options.type
        this.text = options.text
        this.time = options.time || 2000
        setTimeout(() => {
          this.tipType = this.type
        }, 200)
        this.timer = setTimeout(this.close, this.time)
      },
      close () {
        this.tipType = ''
        setTimeout(() => {
          this.type = ''
        }, 200)
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  }
</script>
