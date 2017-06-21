<template lang="jade">
  .wrap-demo
    button(@click="getData") ajax
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      getData () {
        this.$http.get('/static/data/test.json')
          .then(function (res) {
            console.log(res)
          }, function (status) {

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
