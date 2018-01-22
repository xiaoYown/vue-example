<template lang="jade">
  transition(name="fade")
    .xy__popup(v-show="type",@click="close",:style="")
      transition(name="popup-bottom")
        el-alert(
          v-if="typePop === 'alert'",
          :options="popOptions",
          @close="close"
        )
        el-confirm(
          v-else-if="typePop === 'confirm'",
          :options="popOptions",
          @choose="choose"
        )
        el-prompt(
          v-else-if="typePop === 'prompt'",
          :options="popOptions",
          @choose="choose"
        )
</template>

<script>
  require('./main.scss')

  export default {
    name: 'xy_popup',
    components: {
      'el-alert': require('./alert.vue'),
      'el-confirm': require('./confirm.vue'),
      'el-prompt': require('./prompt.vue')
    },
    data () {
      return {
        types: ['alert', 'confirm', 'prompt'],
        type: '',
        typePop: '',
        publicAttrs: ['width', 'title', 'content', 'placeholder'],
        popOptions: {},
        wrapStyle: {},
        cb: null
      }
    },
    methods: {
      show (type, options) {
        let popOptions = {}
        // checkout type
        if (this.types.indexOf(type) >= 0) {
          this.type = type
          setTimeout(() => {
            this.typePop = this.type
          }, 200)
        }
        // set the params form popup
        for (let key in options) {
          if (this.publicAttrs.indexOf(key) >= 0) {
            popOptions[key] = options[key]
          }
        }
        this.popOptions = popOptions
        // set z-index
        if (options.zIndex) {
          this.wrapStyle = {
            zIndex: options.zIndex
          }
        }
        // set callback
        this.cb = options.cb ? options.cb : null
      },
      close () {
        this.typePop = ''
        setTimeout(() => {
          this.type = ''
        }, 200)
      },
      choose (res) {
        if (this.cb) {
          this.cb(res)
        } else {
          this.close()
        }
      }
    }
  }
</script>
