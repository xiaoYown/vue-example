<template lang="jade">
  div.inner-wrap.vue-vuex-wrap
    .vuex-info-wrap
      .vuex-option-wrap
        h4.title 计数器 : 
        input(type="button",value="-",@click="cal('-')")
        input(type="button",value="+",@click="cal('+')")
      .vuex-option-wrap
        h4.title name : 
        input(v-model="stateData.name")
      .vuex-option-wrap
        h4.title age : 
        input(v-model="stateData.age")
      .vuex-option-wrap
        h4.title email : 
        input(v-model="stateData.email")
      .vuex-option-wrap
        h4.title addr : 
        input(v-model="stateData.addr")
      .vuex-option-wrap
        button(@click="saveState") submit
    .vuex-info-wrap
      .vuex-option-wrap
      | {{ calData }}
      .vuex-option-wrap( v-for="value,key in stateShow" )
        h4.title {{ key }} :
        span {{value}}
    .vuex-info-wrap
      div
        .border-choose(:class="{ selected: choosed.t }",@click.stop="choosePlace('t')") 上
        .border-choose(:class="{ selected: choosed.b }",@click.stop="choosePlace('b')") 下
        .border-choose(:class="{ selected: choosed.l }",@click.stop="choosePlace('l')") 左
        .border-choose(:class="{ selected: choosed.r }",@click.stop="choosePlace('r')") 右
        br
        .border-choose(@click.stop="setBorder(1)") 1
        .border-choose(@click.stop="setBorder(2)") 2
        .border-choose(@click.stop="setBorder(3)") 3
      div
        .border-el(:style="jstyle")

</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import { getAttribute } from 'tools/utils'

  export default {
    data () {
      return {
        stateData: {
          name: '',
          age: '',
          email: '',
          addr: ''
        },
        choosed: {
          t: false,
          b: false,
          l: false,
          r: false
        },
        jstyle: {}
      }
    },
    computed: mapState({
      stateShow: state => state.demo.stateShow,
      calData: state => state.demo.calData,
      style: state => state.demo.style
    }),
    watch: {
      style: {
        handler (newVal) {
          this.getStyle(newVal)
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(['saveStateShow', 'saveUserInfo', 'saveCalData', 'saveStyle']),
      saveState () {
        this.saveStateShow({
          method: 'put',
          data: getAttribute(this.stateData)
        })
        this.saveUserInfo({
          method: 'put',
          data: {
            name: this.stateData.name
          }
        })
      },
      cal (symbol) {
        let data = this.calData
        switch (symbol) {
          case '+':
            data += 1
            break
          case '-':
            data -= 1
            break
        }
        this.saveCalData({
          method: 'put',
          data
        })
      },
      getStyle () {
        this.jstyle = {
          borderTop: `${this.style.t}px solid #000`,
          borderBottom: `${this.style.b}px solid #000`,
          borderLeft: `${this.style.l}px solid #000`,
          borderRight: `${this.style.r}px solid #000`
        }
      },
      choosePlace (place) {
        this.choosed[place] = !this.choosed[place]
      },
      setBorder (w) {
        let style = {...this.style}

        if (this.choosed.t) {
          style.t = w
        }
        if (this.choosed.b) {
          style.b = w
        }
        if (this.choosed.l) {
          style.l = w
        }
        if (this.choosed.r) {
          style.r = w
        }

        this.saveStyle({
          method: 'put',
          data: style
        })
      }
    }
  }
</script>

<style lang="sass">
  .vue-vuex-wrap{
    .vuex-info-wrap{
      display: inline-block;
      vertical-align: top;
      width: 50%;
    }
    .vuex-option-wrap{
      line-height: 30px;
      .title{
        display: inline-block;
        vertical-align: middle;
        color: #999;
        width: 60px;
      }
      input{
        display: inline-block;
        vertical-align: middle;
      }
      button{
        color: #fff;
        padding: 4px 5px;
        border-radius: 4px;
        background-color: #56aaff;
      }
      input[type='button']{
        background-color: #56aaff;
        padding: 2px 6px;
        border: none;
        color: #fff;
        margin-right: 10px;
      }
    }
    .border-choose{
      display: inline-block;
      vertical-align: top;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      margin-top: 8px;
      margin-right: 8px;
      color: #fff;
      border-radius: 4px;
      background-color: rgba(0,0,0,.5);
      cursor: pointer;
      &.selected{
        background-color: #000;
      }
      &::selection{
        background: none;
        color: none;
      }
    }
    .border-el{
      width: 50px;
      height: 40px;
      margin-top: 10px;
    }
    input{
      border: 1px solid #000;
    }
  }
</style>
