// Ajax的简单封装
export function httpResponse (api, success, error) {
  api.then(response => {
    success && success(response)
  }, response => {
    error && error(response.status)
    if (response.status === 404 || response.status === 500) {
      console.log('服务器无响应-' + response.status)
    }
  })
}

// arguments.length == 1 提取属性,返回新对象
// arguments.length == 2 提取属性,覆盖原对象属性,返回属性覆盖后对象
export function getAttribute (obj1, obj2) {
  obj2 = obj2 || {}
  // 只提取需要覆盖的属性
  for (let key in obj1) {
    if (!!obj1[key] && typeof obj1[key] === 'object') {
      if (Array.isArray(obj1[key])) {
        obj2[key] = obj1[key]
      } else {
        obj2[key] = getAttribute(obj1[key])
      }
    } else {
      obj2[key] = obj1[key]
    }
  }
  return obj2
}
// 只覆盖第一个参数本身含有的属性
export function saveAttribute (obj1, obj2) {
  for (let key in obj1) {
    if (obj1[key].constructor !== Object) {
      if (obj2[key] !== undefined) {
        obj1[key] = obj2[key]
      }
    } else if (obj2[key] !== undefined) {
      obj1[key] = saveAttribute(obj1[key], obj2[key])
    }
  }
  return obj1
}
// 检查是狗为空对象
export function isEmpty (obj) {
  if (typeof obj !== 'object') {
    console.error('It is not a Object')
    return true
  }
  return Object.keys(obj).length === 0
}
