import Vue from 'vue'
import Popup from './main.vue'

var PopupConstructor = Vue.extend(Popup)

const createInstaller = function () {
  return function () {
    var popupWrap = document.createElement('div')
    document.body.appendChild(popupWrap)

    var popup = new PopupConstructor({ el: popupWrap })

    Vue.prototype.$alert = function (options) {
      popup.show('alert', options)
    }
    Vue.prototype.$confirm = function (options) {
      popup.show('confirm', options)
    }
    Vue.prototype.$prompt = function (options) {
      popup.show('prompt', options)
    }
    Vue.prototype.$closePopup = function (options) {
      popup.close()
    }
  }
}

export default {
  install: createInstaller()
}
