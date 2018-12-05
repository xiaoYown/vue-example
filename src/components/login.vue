<template lang="jade">
  .g-LoginPage
    .g-LoginForm
      label.g-LoginLabel
        h4.g-LoginTitle YOUR NAME:
        input.g-LoginName(v-model="user_id")
      .g-LoginSubmit(@click="login") login
</template>

<script>
  import { saveCookie } from '@/utils/client'
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
