<template>
  <div class="index-wrap">
    <div class="container">
      <h3>home</h3>
      <div>
        <h4 class="user-name">{{ userInfo.name }}</h4>
        <span>welcome</span>
        <br>
        <a href="/demo">link to demo</a>
        <br>
        <a href="/components">link to components</a>
        <br>
        <router-link to="/login">login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCookie } from '@/utils/client'
  import { mapState, mapActions } from 'vuex'

  const jquery = r => require.ensure([], () => r(require('jquery')), 'jquery')
  console.log(jquery)

  export default{
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
      class user {
        getUsername () {
          // to do
        }
      }
      console.log(user)
    },
    methods: {
      ...mapActions(['saveUserInfo'])
    }
  }
</script>

<style lang="sass">
  .index-wrap{
    .container{
      width: 800px;

      font-size: 20px;
      
      margin: 0 auto;
      h3{
        font-size: 30px;	
      }
      .user-name{
        display: inline-block;
        vertical-align: middle;

        color: #56aaff;
        font-size: 24px;
        font-weight: bold;
        
        padding-right: 20px;
      }
    }
  }
</style>
