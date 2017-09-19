<template lang="jade">
  .emot(ref="wrap",:class="{size_l: size === 'l'}",@mousedown.stop="outEdit")
    .emot_area(@mousedown.stop="edit")
      .emot_pre(ref="pre",v-html="preCt")
      label
          // v-show="!writting",
        .emot_show(
          ref="html",
          v-html="transCt"
        )
          // v-show="writting",
        textarea(
          ref="area",
          :style="style",
          v-model="ct",
          @input="input",
        )
    .emot_msg
      emot-lib(@select="chooseEmot")
      // p.emot_send(@click="reply") 发送
</template>

<script>
  import ems from './emot'
  require('./emot.scss')

  export default {
    components: {
      'emot-lib': require('./lib.vue')
    },
    props: {
      size: String
    },
    data () {
      return {
        writting: false,
        ct: '',
        preCt: '',
        transCt: '',
        style: {}
      }
    },
    watch: {
      ct (val) {
        this.preCt = ems.sameLen(val) + '&nbsp;'
      },
      writting (val) {
        if (!val) {
          this.transCt = ems.compile(this.ct)
        }
      }
    },
    mounted () {
      this.$refs.area.addEventListener('scroll', this.scroll)
      document.addEventListener('mousedown', this.outEdit)
    },
    beforeDestroy () {
      this.$refs.area.removeEventListener('scroll', this.scroll)
      document.removeEventListener('mousedown', this.outEdit)
    },
    methods: {
      scroll () {
        this.$refs.html.scrollTop = this.$refs.area.scrollTop
      },
      edit () {
        this.writting = true
      },
      outEdit () {
        this.writting = false
      },
      reply () {
        this.$emit('reply', this.ct)
      },
      input () {
        this.transCt = ems.compile(this.ct)
      },
      chooseEmot (em) {
        if (ems.lib.indexOf(em) >= 0) {
          this.insertEm(em)
        }
      },
      insertEm (em) {
        let part1 = this.ct.substring(0, this.$refs.area.selectionStart)
        let part2 = this.ct.substring(this.$refs.area.selectionEnd, this.ct.length)
        let start = this.$refs.area.selectionStart + em.length + 2

        this.ct = `${part1}[${em}]${part2}`
        this.transCt = ems.compile(this.ct)
        setTimeout(() => {
          this.$refs.area.selectionStart = this.$refs.area.selectionEnd = start
        }, 1)
      }
    }
  }
</script>
