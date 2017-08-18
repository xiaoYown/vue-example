<template lang="jade">
  .xy-loading
    .xy-loading_main
      i.xy-loading_main-icon
</template>

<script>

</script>

<style lang="sass">
  .xy-loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 10;
    &_main {
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(0, 0, 0, .9);
      width: 40px;
      height: 40px;
      border-radius: 3px;
      &-icon {
        display: block;
        color: #fff;
        &:before {
          content: "\E616";
        }
      }
    }
  }
</style>
