import cookie from 'react-cookie'

let cookieConfig = {
  domain: '',
  maxAge: 295000
}
export function saveCookie (name, value) {
  cookie.save(name, value, cookieConfig)
}

export function getCookie (name) {
  return cookie.load(name)
}

export function removeCookie (name) {
  cookie.remove(name, cookieConfig)
}
export function removeCookieAll () {
  Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name, cookieConfig))
}
export function signOut () {
  cookie.remove('session', cookieConfig)
}

export function isLogin () {
  return !!cookie.load('session')
}

export function saveLocalStorage (name, value) {
  window.localStorage.setItem(name, value)
}

export function getLocalStorage (name) {
  return window.localStorage.getItem(name)
}
