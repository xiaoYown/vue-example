<template lang="jade">
  .wrap-demo
    button(@click="getData") ajax
</template>

<script>
  // import config from 'config/config'

  export default {
    data () {
      return {}
    },
    created () {
      // https test
      this.$http.get('/static/data/test.json')
        .then(function (res) {
          console.log(res)
        }, function (status) {
          console.log(status)
        })
    },
    methods: {
      getData () {
        this.$http.get('/static/data/test.json')
          .then(function (res) {
            console.log(res)
          }, function (status) {
            console.log(status)
          })
      }
    }
  }
</script>

<style lang="sass">
  .wrap-demo {
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    
    background-color: green;

    button {
      padding: 4px 6px;
      border: 1px solid #fff;
      margin: 30px;	
      border-radius: 3px;
      background: none;
    }
  }
</style>
