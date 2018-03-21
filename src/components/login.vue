<template lang="jade">
  .login-wrap
    .login-form
      label.info-select
        h4 YOUR NAME:
        input(v-model="user_id")
      button.login-submit(@click="login") login
</template>

<script>
  import { saveCookie } from 'tools/client'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        user_id: ''
      }
    },
    methods: {
      ...mapActions(['saveUserInfo']),
      login () {
        saveCookie('session', this.user_id)
        this.saveUserInfo({
          method: 'put',
          data: {
            name: this.user_id
          }
        })
        this.$router.push({path: '/'})
      }
    }
  }
</script>

<style lang="sass">
  .login-wrap{
    .login-form{
      width: 800px;
      
      text-align: center;

      padding: 80px;
      margin: 0 auto;
    }
    .info-select{
      display: inline-block;

      width: 100%;
      
      color: #888;
      font-size: 20px;
      line-height: 30px;

      h4{
        display: inline-block;
        vertical-align: top;

        width: 20%;
        
        font-size: 20px;
      }
      input{
        display: inline-block;
        vertical-align: top;

        min-width: 200px;
        height: 30px;

        padding: 0 10px;
        
        font-size: 20px;
        border: 1px solid #888;
      }
        }
    .login-submit{
      min-width: 100px;

      color: #56aaff;
      font-size: 20px;
      line-height: 24px;

      padding: 8px 12px;
      margin-top: 20px;

      background-color: #fff;
      border: 1px solid #56aaff;
      border-radius: 4px;

      transition: all .4s;

      &:hover{
        color: #fff;
        background-color: #56aaff;
      }
    }
  }
</style>
