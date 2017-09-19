<template lang="jade">
  .report__cmt-reply(ref="wrap",:class="{size_l: size === 'l'}",@mousedown.stop="outEdit")
    .report__cmt-reply_area(@mousedown.stop="edit")
      .report__cmt-reply_pre(ref="pre",v-html="preCt")
      label
        .report__cmt-reply_show(
          v-show="!writting",
          v-html="transCt"
        )
        textarea(
          v-show="writting",
          ref="area",
          :style="style",
          v-model="ct",
          @input="input",
        )
    .report__cmt-reply_msg
      el-emot(@choose="chooseEmot")
      p.report__cmt-reply_send(@click="reply") 发送
</template>

<script>
  import ems from './emot'

  export default {
    components: {
      'el-emot': require('./emot.vue')
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
      this.style = { width: this.size === 'l' ? '514px' : '428px' }
      document.addEventListener('mousedown', this.outEdit)
    },
    beforeDestroy () {
      document.removeEventListener('mousedown', this.outEdit)
    },
    methods: {
      edit () {
        this.writting = true;
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
      insertEm(em) {
        let part_1 = this.ct.substring(0, this.$refs.area.selectionStart),
            part_2 = this.ct.substring(this.$refs.area.selectionEnd, this.ct.length),
            start = this.$refs.area.selectionStart + em.length + 2
          
        this.ct = `${part_1}[${em}]${part_2}`
        this.transCt = ems.compile(this.ct)
        setTimeout(() => {
          this.$refs.area.selectionStart = this.$refs.area.selectionEnd =  start
        }, 1)
      }
    }
  }
</script>