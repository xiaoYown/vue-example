import Vue from 'vue'
import Popup from './main.vue'

var PopupConstructor = Vue.extend(Popup)

const createInstaller = function () {
  return function () {
    var popupWrap = document.createElement('div')
    document.body.appendChild(popupWrap)

    var popup = new PopupConstructor({ el: popupWrap })

    Vue.prototype.$popup = function (options) {
      if (/^(alert|confirm|prompt)$/.test(options.type)) {
        popup.show(options.type, options)
      } else {
        console.error('type error')
      }
    }

    Vue.prototype.$closePopup = function (options) {
      popup.close(options)
    }
  }
}

export default {
  install: createInstaller()
}
