<template lang="jade">
  .animation-dynamic-wrap
    div(v-show="hshow",ref="animationBox")
      slot
</template>

<script>
  export default {
    props: {
      animation: {
        type: Number,
        default: 1
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        hshow: false
      }
    },
    watch: {
      show (newVal) {
        if (newVal) {
          this.beforeEnter()
          this.enter()
        } else {
          this.leave()
        }
      }
    },
    // mounted(){
    //   this.hshow = false
    // },
    methods: {
      beforeEnter () {
        // this.$refs.animationBox.className = 'opacity-0 '
      },
      enter () {
        // this.$refs.animationBox.className += 'opacity-1 '
        let _this = this
        let name = `bounce-${this.animation}-active`
        this.$refs.animationBox.className = name
        this.hshow = true
        setTimeout(function () {
          _this.$refs.animationBox.className = ''
        }, 500)
      },
      leave () {
        let _this = this
        let name = `leave-${this.animation}-active`
        this.$refs.animationBox.className = name
        setTimeout(function () {
          _this.$refs.animationBox.className = ''
          _this.hshow = false
        }, 500)
      }
    }
  }
</script>

<style lang="sass">

  .bounce-1-active {animation: bounce-1 .5s; }
  .bounce-2-active {animation: bounce-2 .5s; }
  .bounce-3-active {animation: bounce-3 .5s; }

  .leave-1-active {animation: leave-1 .5s;}
  .leave-2-active {animation: leave-2 .5s;}
  .leave-3-active {animation: leave-3 .5s;}

  @keyframes bounce-1 {
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
  @keyframes bounce-2 {
    0% {
      transform: translateX(200px);
    }
    70% {
      transform: translateX(-20px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes bounce-3 {
    0% {
      transform: translateY(-200px);
    }
    70% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes leave-1 {
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
    @keyframes leave-2 {
    0% {
      transform: translateX(0);
    }
    70% {
      transform: translateX(-20px);
    }
    100% {
      transform: translateX(200px);
    }
  }
  @keyframes leave-3 {
    0% {
      transform: translateY(0);
    }
    70% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(-200px);
    }
  }
</style>
