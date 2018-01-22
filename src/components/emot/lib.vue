<template lang="jade">
  .emot__lib
    .emot__lib-choose(@mousedown.stop.prevent="open(1)") 选择表情
    ul.emot__lib-box(v-show="show")
      li.emot__lib-img(v-for="emot in emots",@mousedown="select(emot)")
        img(:src="'/static/em/' + emot + '.gif'")
</template>

<script>
  import ems from './emot'

  export default {
    data () {
      return {
        show: false,
        emots: []
      }
    },
    created () {
      this.emots = ems.lib
      window.addEventListener('mousedown', this.open(false))
    },
    beforeDestroy () {
      window.removeEventListener('mousedown', this.open(false))
    },
    methods: {
      open (bool) {
        if (bool === 1) {
          this.show = !this.show
        }
      },
      select (emot) {
        this.$emit('select', emot)
        this.show = false
      }
    }
  }
</script>

<style lang="sass">
  .emot__lib {
    position: relative;
    display: inline-block;
    &-choose {
      cursor: pointer;
    }
    &-box {
      position: absolute;
      bottom: 100%;
      width: 400px;
      padding: 8px;
      background-color: #eee;
      z-index: 10;
    }
    &-img {
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
    }
  }
</style>
