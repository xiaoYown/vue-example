<template lang="jade">
  .wrap-demo-params
    div params page
    p {{ params.name }}
    p {{ params.age  }}
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
  .wrap-demo-params{
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: pink;
  }
</style>
