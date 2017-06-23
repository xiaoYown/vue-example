<template lang="jade">
  .xy-range-wrap(@dragover.prevent="")
    .xy-range-runway(
      ref="runway",
      @click.stop="progressChoose"
    )
      .xy-range-progress(:style="{ width: width + '%' }")
        span.xy-range-thumb
          span.xy-range-thumb-shadow(
            ref="shadow",
            draggable="true",
            @dragstart="dragstart",
            @drag="dragmove",
            @dragend="dragend"
          )
</template>

<script>
  function percentCal (val, max) {
    return Math.floor(val * 100 / max) / 100
  }

  export default {
    name: 'xy-rang',
    props: {
      mark: {
        type: String,
        default: ''
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      unit: {
        type: Number,
        default: 1
      },
      val: {
        type: Number,
        default: 0
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        mouse: {
          x: 0
        },
        pointer: {
          x: 0
        },
        axis: {
          w: 0
        },
        width: 0
      }
    },
    created () {
      this.width = percentCal(this.val - this.min, this.max - this.min)
      this.axis.w = this.percent
    },
    watch: {
      percent (newVal) {
        this.axis.w = newVal
      }
    },
    methods: {
      dragstart (event) {
        this.mouse.x = event.clientX * 100
        this.pointer.x = this.axis.w
      },
      dragmove (event) {
        if (event.clientX === 0 && event.clientY === 0) return
        let width = this.$refs.runway.clientWidth

        let x = Math.floor((event.clientX - this.mouse.x + this.pointer.x * width) * 100 / width)

        if (x > 100) {
          x = 100
        } else if (x < 0) {
          x = 0
        }
        this.axis.w = x / 100
      },
      dragend (event) {
        this.$emit('range-change', this.axis.w)
      },
      progressChoose (event) {
        if (event.target === this.$refs.shadow) return
        this.axis.w = Math.floor(event.offsetX * 100 / this.$refs.runway.offsetWidth) / 100
        this.dragend()
      }
    }
  }
</script>

<style lang="sass">
  .xy-rang-wrap{
    position: relative;
    height: 16px;
    line-height: 16px;
  }
  .xy-range-runway{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 4px;
    background-color: #e8e9ef;
    cursor: pointer;
  }
  .xy-range-progress{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #bbbdc3;
    transition: width .1s;
  }
  .xy-range-thumb{
    position: absolute;
    width: 16px;
    height: 16px;
    top: -6px;
    right: -8px;
    border-radius: 50%;
    background-color: #4c7cf7;
    cursor: pointer;
  }
  .xy-range-thumb-shadow{
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
</style>
