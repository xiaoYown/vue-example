<template lang="jade">
  .wrap-demo-bar
    span multi-page-bar
      .event__box(@click.self="choose")
        .event__box-ctx box
</template>

<script>
  export default {
    methods: {
      choose (event) {
        console.log(event.target)
      }
    }
  }
</script>

<style lang="sass">
  .wrap-demo-bar{
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .event__box {
    width: 100px;
    height: 100px;
    border: 1px solid #56aaff;
  }
</style>
