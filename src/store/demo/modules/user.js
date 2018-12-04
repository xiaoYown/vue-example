import * as types from './types'

const state = {
  userInfo: {}
}
/** state 操作说明
 *  @param String method get/add/del/put 请求首次获取 / 增 / 删 / 改
 */
const mutations = {
  [types.SAVE_USER_INFO] (state, payload) {
    switch (payload.method) {
      case 'put':
        state.userInfo = payload.data
        break
    }
  }
}

const actions = {
  saveUserInfo: ({ commit }, param) => {
    commit(types.SAVE_USER_INFO, param)
  }
}

export default {
  state, mutations, actions
}
