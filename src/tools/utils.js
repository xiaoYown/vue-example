//Ajax的简单封装
export function httpResponse(api,success,error) {
  var _this=this;
  api.then(response => {
    success && success(response);
  },response => {
    error && error(response.status)
    if(response.status==404 || response.status==500){
        console.log('服务器无响应-'+response.status)
    }
  })
}

// arguments.length == 1 提取属性,返回新对象
// arguments.length == 2 提取属性,覆盖原对象属性,返回属性覆盖后对象
export function getAttribute(obj_1, obj_2 ){
  obj_2 = obj_2 || {};
  for( let key in obj_1 ){   // 只提取需要覆盖的属性
    if( !!obj_1[key] && typeof obj_1[key] == 'object' ){
      if( Array.isArray(obj_1[key]) )
        obj_2[key] = obj_1[key];
      else
        obj_2[key] = getAttribute(obj_1[key]);
    } else {
      obj_2[key] = obj_1[key];
    }
  }
  return obj_2
}
// 只覆盖第一个参数本身含有的属性
export function saveAttribute(obj_1, obj_2){
  for( let key in obj_1 ){

    if( obj_1[key].constructor != Object ){
      if( obj_2[key] != undefined ){
        obj_1[key] = obj_2[key];
      }
    } else if( obj_2[key] != undefined ) {
      obj_1[key] = saveAttribute(obj_1[key], obj_2[key]);
    }
  }
  return obj_1
}
// 检查是狗为空对象
export function isEmpty(obj){
  if( typeof obj != 'object' ){
    console.error('It is not a Object');
    return true
  }
  return Object.keys(obj).length == 0
}