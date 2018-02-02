<template lang="jade">
  .global__search(
    :class="'search--' + type",
    :style="{ width: this.width + 'px' }",
  )
    input.global__search-input(
      type="text",
      :placeholder="placeholder",
      v-model="val",
      @input="input",
      @keydown.13="enter"
    )
    i.global__search-icon(@click="search")
      .iconfont.icon-search
    i.iconfont.icon-guanbi(
      v-show="val",
      @click="clear"
    )
</template>

<script>
  export default {
    name: 'global-search',
    props: {
      type: {
        type: String,
        default: 'default' // ghost
      },
      width: Number,
      name: String,
      placeholder: [String, Number],
      value: [String, Number]
    },
    data () {
      return {
        val: ''
      }
    },
    created () {
      this.val = this.value
    },
    methods: {
      clear () { // 清除 value
        this.val = ''
      },
      input (event) { // value 改变时回传事件
        this.send('input', event)
      },
      enter (event) { // 按下 enter 时回传事件
        this.send('enter', event)
      },
      search (event) { // 点击搜索
        this.send('search', event)
      },
      send (evName, event) {
        this.$emit(evName, {
          event,
          name: this.name,
          value: this.val
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../../../assets/sass/theme';

  .global__search {
    position: relative;
    display: block;
    &-input {
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      &:focus+.global__search-icon+.iconfont {
        display: block;
      }
    }
    &-icon {
      position: absolute;
      top: 1px;
      right: 1px;
      bottom: 1px;
      width: 54px;
      background-color: $std_main_A;
      text-align: center;
      cursor: pointer;
      .iconfont {
        color: #fff;
        font-size: 16px;
      }
    }
    &.search--default {
      .global__search-input {
        padding: 0 95px 0 10px;
        border: 1px solid $std_main_A;
        border-radius: 2px;
      }
    }
    &.search--ghost {
      .global__search-input {
        padding: 0 58px 0 10px;
        border: 1px solid $std_sub_4;
        border-radius: 2px;
        &:focus {
          border: 1px solid $std_main_A;
          &+.global__search-icon .iconfont {
            // color: $std_main_A;
          }
        }
      }
      .global__search-icon {
        width: 39px;
        background: none;
        .iconfont {
          color: $std_sub_2;
        }
      }
      .icon-guanbi {
        right: 39px;
      }
    }
    .icon-guanbi {
      display: none;
      position: absolute;
      top: 1px;
      right: 65px;
      bottom: 1px;
      font-size: 12px;
      cursor: pointer;
    }
  }
</style>
