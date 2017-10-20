<template lang="jade">
  .index-wrap
    .container 
      h3 home
      div
        h4.user-name {{ userInfo.name }} 
        | welcome !
        br
        a(href="/demo") link-demo
        // router-link(:to="'/login'") login
        br
        a(href="/components") link-components
        // router-link(:to="'/components'") components
        br
        router-link(:to="'/login'") login
</template>

<script>

  import { getCookie } from 'tools/client'

  import { mapState, mapActions } from 'vuex'

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
