<template lang="jade">
  .recursive
    rec-cpn(:list="list")
</template>

<script>
  export default {
    components: {
      'rec-cpn': require('../mixin/recursive.vue')
    },
    data () {
      return {
        list: [
          {
            name: 'Lil 1',
            child: [
              {
                name: 'Lil 1-1',
                child: [
                  {
                    name: 'Lil 1-2',
                    child: []
                  }
                ]
              }
            ]
          }, {
            name: 'Lil 2',
            child: [
              {
                name: 'Lil 2-1',
                child: [
                  {
                    name: 'Lil 2-1-1',
                    child: []
                  }, {
                    name: 'Lil 2-1-2',
                    child: [
                      {
                        name: 'Lil 2-1-2-1',
                        child: []
                      }, {
                        name: 'Lil 2-1-2-1',
                        child: []
                      }
                    ]
                  }
                ]
              }, {
                name: 'Lil 2-2',
                child: [
                  {
                    name: 'Lil 2-2-1',
                    child: []
                  }, {
                    name: 'Lil 2-2-2',
                    child: []
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
</script>
