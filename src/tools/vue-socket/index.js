import Observer from './Observer'
import Emitter from './Emitter'

export default {
  install (Vue, connection, store) {
    if (!connection) {
      throw new Error('[Vue-Socket.io] cannot locate connection')
    }
    // let observer = new Observer(connection, store)
    // Vue.prototype.$socket = observer.Socket
    let $socket = {}
    let _observer
    for (let _key in connection) {
      _observer = new Observer(connection[_key], store)
      $socket = _observer.Socket
      Vue.prototype['$' + _key] = $socket
    }

    Vue.mixin({
      created () {
        let sockets
        for (let _key in connection) {
          sockets = this.$options[_key]

          this.$options[_key] = new Proxy({}, {
            set: (target, key, value) => {
              Emitter.addListener(key, value, this)
              target[key] = value
              return true
            },
            deleteProperty: (target, key) => {
              Emitter.removeListener(key, this.$options[_key][key], this)
              delete target.key
              return true
            }
          })
          if (sockets) {
            Object.keys(sockets).forEach((key) => {
              this.$options[_key][key] = sockets[key]
            })
          }
        }
      },
      beforeDestroy () {
        let sockets
        for (let _key in connection) {
          sockets = this.$options[_key]
          if (sockets) {
            Object.keys(sockets).forEach((key) => {
              delete this.$options[_key][key]
            })
          }
        }
      }
    })
  }
}
