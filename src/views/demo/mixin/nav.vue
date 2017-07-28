<template lang="jade">
  nav.nav-demo
    .nav-content
      div.select.user-name {{ userInfo.name }}
      span.link-show(@click="showLink = !showLink") link
      .nav__link-box(v-show="showLink")
        a.select.link(href="./") home
        router-link.select.link(to="/") demo
        router-link.select.link(to="/foo") foo
        router-link.select.link(to="/bar") bar
        router-link.select.link(to="/animation") animation
        router-link.select.link(to="/vuex") vuex
        router-link.select.link(to="/socket") socket
        // router-link.select.link(to="/nested") nested
        router-link.select.link(:to="{ name: 'params', params: { name: userInfo.name, age: 12 } }") params
</template>

<script>
  
  import { getCookie } from 'tools/client'

  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        showLink: false
      }
    },
    computed: mapState({
      userInfo: state => state.user.userInfo
    }),
    created () {
      let userName = getCookie('session')

      if (userName) {
        this.saveUserInfo({
          method: 'put',
          data: {
            name: userName
          }
        })
      }
    },
    methods: {
      ...mapActions(['saveUserInfo'])
    }
  }
</script>

<style lang="sass">
  .nav-demo{
    color: #fff;
    .nav__link-box {
      top: 60px;;
      right: 10px;
      width: 300px;
      position: fixed;
      background-color: #56aaff;
      text-align: left;
      border-radius: 3px;
      z-index: 10;
    }
    background-color: #56aaff;
    .nav-content{
      height: 28px;

      text-align: right;
      line-height: 28px;

      padding: 10px 0;
      margin: 0 auto;
      .select, .link-show {
        display: inline-block;
        vertical-align: top;

        color: #fff;

        padding: 0px 16px;
      }
      .user-name{
        font-size: 20px;
      }
      .link, .link-show{
        margin-right: 10px;

        border: 1px solid #fff;
        border-radius: 4px;
        cursor: pointer;
        &:hover{
          color: #56aaff;
          background-color: #fff;
          transition: all .4s;
        }
      }
      .link {
        margin: 5px;
      }
    }
  }
</style>
