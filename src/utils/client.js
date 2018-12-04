// import cookie from 'react-cookie'

let sessionStorage = window.sessionStorage
let localStorage = window.localStorage

let cookieConfig = {
  domain: '',
  maxAge: 295000
}

// export function getCookie (name) {
//   return cookie.load(name)
// }

// export function removeCookie (name) {
//   cookie.remove(name, cookieConfig)
// }

// export function removeCookieAll () {
//   Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name, cookieConfig))
// }
// export function signOut () {
//   cookie.remove('session', cookieConfig)
// }

// export function isLogin () {
//   return !!cookie.load('session')
// }

export function saveCookie (name, value) {
  sessionStorage.setItem(name, value, cookieConfig)
}

export function saveLocalStorage (name, value) {
  localStorage.setItem(name, value)
}

export function getLocalStorage (name) {
  return localStorage.getItem(name)
}

export function getCookie (name) {
  return sessionStorage.getItem(name)
}

export function removeCookie (name) {
  sessionStorage.removeItem(name)
}

export function removeCookieAll () {
  sessionStorage.clear()
}
export function signOut () {
  sessionStorage.removeItem('session')
}

export function isLogin () {
  return sessionStorage.getItem('session')
}
