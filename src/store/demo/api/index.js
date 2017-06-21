/* 所有请求的方法 */
import * as resource from './resource'
/** vue-reource 说明
 * @method get: {method: 'GET'}
 * @method post: {method: 'POST'}
 * @method head: {method: 'HEAD'}
 * @method request: {method: 'GET'}
 * @method patch: {method: 'PATCH'}
 * @method put: {method: 'PUT'}
 * @method delete: {method: 'DELETE'}
 */
export default {
  // actions request
  index (options) {
    return resource.index.save({...options})
  }
}
