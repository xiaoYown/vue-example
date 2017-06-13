<template lang="jade">
  label.xy-select-wrap
    span.xy-select-list-checked {{ checked }}
    input(
      type="checkbox",
      ref="input",
    ).xy-select-shadow
    ul.xy-select-list
        li.xy-select-list-item(
          v-for="item in list"
          @click.stop="checkedChange(item.id)"
        ) {{ item.ct }}
            
</template>

<script>
    export default {
      props: {
        list: {
          type: Array,
          default: []
          // {
          //     id: '', // 返回
          //     ct: '', // 显示内容
          //     checked: bool, // 选中
          // }
        }
      },
      data () {
        return {
          checked: '请选择',
          spread: false
        }
      },
      methods: {
        checkedList () {
          for (let i = 0, len = this.list.length; i < len; i++) {
            if (this.list[i].checked) {
              this.checked = this.list[i].ct
            }
          }
        },
        checkedChange (id) {
          for (let i = 0, len = this.list.length; i < len; i++) {
            if (this.list[i].id === id) {
              this.checked = this.list[i].ct
            }
          }
          this.$emit('select-change', id)
        }
      }
    }
</script>

<style lang="sass">
    .xy-select-wrap{
        display: block;
    }
    .xy-select-list{
        display: none;
    }
    .xy-select-shadow{
        display: none;
        &:checked+.xy-select-list{
            display: block;
        }
    }
</style>
