<template lang="jade">
  div
    p {{item.name.name}}
</template>

<script>
  export default {
    props: {
      item: Object,
      param: String
    },
    computed: {
      // item () {
      //   return this.$store.state.demo.setTest[this.param]
      // }
    },
    watch: {
      'item.name': {
        handler (n, o) {
          console.log(this.item.name.name)
        },
        deep: true
      }
    }
  }
</script>
