<template lang="jade">
  .wrap-demo-animation
    .demo-animation
      button(@click="dynamicAnimate(1)") 01
      button(@click="dynamicAnimate(2)") 02
      button(@click="dynamicAnimate(3)") 03
      button(@click="moveIn") show
      button 自定义方式
      dynamic(:animation="dynamicType",:show="show")
        .box
    .demo-animation
      button(@click="moveIn_01") show
      button transition 钩子方式
      br
      .box(ref="animate_01",v-show="show_01_")
      transition(
        v-bind:css="false",
        v-on:before-enter="beforeEnter",
        v-on:enter="enter",
        v-on:leave="leave"
      )
          p(v-show="show_01")
</template>

<script>
  export default {
    components: {
      dynamic: require('components/animation/dynamic.vue')
    },
    data () {
      return {
        show: false,
        show_01: false,
        show_01_: false,
        dynamicType: 1
      }
    },
    methods: {
      moveIn () {
        this.show = !this.show
      },
      dynamicAnimate (type) {
        this.dynamicType = type
      },
      moveIn_01 () {
        this.show_01 = !this.show_01
        if (!this.show_01_) {
          this.show_01_ = true
        }
      },
      beforeEnter () {
        let _this = this
        this.$refs.animate_01.className += ' animation_01'
        function end () {
          _this.$refs.animate_01.className = _this.$refs.animate_01.className.replace(/(^|\s)?animation_01(^|\s)?/g, '')
          _this.$refs.animate_01.removeEventListener('animationend', end)
        }
        this.$refs.animate_01.addEventListener('animationend', end)
      },
      enter () {
      },
      leave () {
        let _this = this
        this.$refs.animate_01.className += ' animation_leave_01'

        function end () {
          _this.show_01_ = false
          _this.$refs.animate_01.className = _this.$refs.animate_01.className.replace(/(^|\s)?animation_leave_01(^|\s)?/g, '')
          _this.$refs.animate_01.removeEventListener('animationend', end)
        }
        this.$refs.animate_01.addEventListener('animationend', end)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .wrap-demo-animation{
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    .demo-animation{
            padding: 30px;
            height: 200px;
        }
        .box{
            width: 100px;
            height: 100px;
            background-color: #000;
        }
        button{
            padding: 10px;
            margin: 10px;
            background-color: #56aaff;
        }
        .animation_01{
            animation: animation_01 1s;
        }
        .animation_leave_01{
            animation: animation_leave_01 1s;
        }
        @keyframes animation_01 {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                transform: scale(1.5);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        @keyframes animation_leave_01 {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.5);
            }
            100% {
                transform: scale(0);
                opacity: 0;
            }
        }
  }
</style>
