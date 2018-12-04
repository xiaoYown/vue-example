<template lang="jade">
  .wrap-demo-animation
    .demo-animation
      button(@click="dynamicAnimate(1)") 01
      button(@click="dynamicAnimate(2)") 02
      button(@click="dynamicAnimate(3)") 03
      button(@click="moveIn") show
      button 自定义方式
      el-dynamic(:animation="dynamicType",:show="show")
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
    h3 列表动画
    .demo-animation
      transition-group.animation__flip(name="flip-list",tag="ul")
        li(v-for="item,index in flipList",v-bind:key="item") {{ item }}
          span(@click="flipMove('up', index)") 上
          span(@click="flipMove('down', index)") 下
          span(@click="flipMove('rem', index)") 删除
</template>

<script>
  import ElDynamic from '@/components/animation/dynamic.vue'

  export default {
    components: {
      ElDynamic
    },
    data () {
      return {
        show: false,
        show_01: false,
        show_01_: false,
        dynamicType: 1,
        flipList: [1, 2, 3, 4, 5, 6, 7, 8]
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
      },
      flipMove (direct, index) {
        let item
        switch (direct) {
          case 'up':
            if (index > 0) {
              item = this.flipList.splice(index, 1)[0]
              this.flipList.splice(--index, 0, item)
            }
            break
          case 'down':
            if (index < (this.flipList.length - 1)) {
              item = this.flipList.splice(index, 1)[0]
              this.flipList.splice(++index, 0, item)
            }
            break
          case 'rem':
            this.flipList.splice(index, 1)
        }
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
    h3 {
      font-size: 16px;
      padding-left: 20px;
    }
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
    .animation__flip {
      li {
        line-height: 24px;
        margin-bottom: 4px;
      }
      span {
        display: inline-block;
        background-color: #56aaff;
        margin-left: 10px;
        padding: 0 6px;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
      }
    }
    // 列表过渡
    .flip-list-move {
      transition: all 1s;
    }
    .flip-list-enter, .flip-list-leave-to, .flip-list-enter-to, .flip-list-enter-active {
      opacity: 0;
      transform: translateY(30px);
    }
    .flip-list-leave-active {
      position: absolute;
    }
  }
</style>
