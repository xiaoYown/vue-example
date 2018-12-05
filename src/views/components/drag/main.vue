<template lang="jade">
  .ui-compoents-drag
    textarea.input-test(
      :style="style"
    )
    xy-drag(
      :params="axis",
      @changing="changing",
      @changed="changed"
    )
</template>

<script>
  import XyDrag from '@/components/ui/drag.vue'

  export default {
    name: 'PageDrag',
    components: {
      XyDrag
    },
    data () {
      return {
        axis: {
          x: 200,
          y: 200,
          h: 200,
          w: 200,
          r: 0
        },
        style: {}
      }
    },
    watch: {
      axis: {
        handler (newVal) {
          this.setStyle(newVal)
        },
        deep: true
      }
    },
    created () {
      this.setStyle(this.axis)
    },
    methods: {
      changing (data) {
        this.axis = data
      },
      changed (data) {
        // console.log(JSON.stringify(data))
        this.axis = data
      },
      setStyle (data) {
        // console.log(data.r)
        this.style = {
          top: data.y + 'px',
          left: data.x + 'px',
          width: data.w + 'px',
          height: data.h + 'px',
          transform: 'rotate(' + data.r + 'deg)'
        }
      }
    }
  }
</script>

<style lang="sass">
    .ui-compoents-drag{
        position: relative;
        height: 100vh;
        background-color: #fefefe;
    }
    .input-test{
        position: absolute;
        border: 1px solid #000;
    }
</style>
