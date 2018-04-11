<template lang="jade">
  .wrap-demo-nested
    router-link(to="/demo/nested/1") childrent-1
    router-link(to="/demo/nested/2") childrent-2
    div
      router-view
</template>

<script>
  export default {
    data () {
      return {
        params: {
          name: this.$route.name,
          age: this.$route.age
        }
      }
    }
  }
</script>

<style lang="sass">
  .wrap-demo-nested{
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
