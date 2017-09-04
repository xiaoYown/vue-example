<template lang="jade">
  .rec__cpn
    .rec__cpn-list(v-for="item in list")
      .rec__cpn-name name: {{item.name}}
      .rec__cpn-child
        p ----child-----
        rec-cpn(:list="item.child")
</template>

<script>
  export default {
    name: 'recCpn',
    props: {
      list: Array
    }
  }
</script>

<style lang="sass">
  .rec__cpn {
    &-name {
      font-weight: bold;
      color: #000;
    }
    &-child {
      padding-left: 16px;
      &>p {
        color: #ccc;
      }
    }
  }
</style>
