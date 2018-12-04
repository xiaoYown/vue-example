import Vue from 'vue'
import Tip from './main.vue'

var TipConstructor = Vue.extend(Tip)

const createInstaller = function () {
  return function () {
    var tipWrap = document.createElement('div')
    document.body.appendChild(tipWrap)

    var tip = new TipConstructor({ el: tipWrap })

    Vue.prototype.$tip = function (options) {
      if (/^(fail|success)$/.test(options.type)) {
        tip.show(options)
      } else {
        console.error('tip type error')
      }
    }
    Vue.tip = Vue.prototype.$tip
  }
}

export default {
  install: createInstaller()
}
