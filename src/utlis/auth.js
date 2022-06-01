export function getToken() {
  return window.sessionStorage.getItem('token')
}

export function setToken(token) {
  return window.sessionStorage.setItem('token', token)
}
export function getUserId() {
  return window.sessionStorage.getItem('userId')
}

export function setUserId(userId) {
  return window.sessionStorage.setItem('userId', userId)
}
export function getUserName() {
  return window.sessionStorage.getItem('userName')
}

export function setUserName(userName) {
  return window.sessionStorage.setItem('userName', userName)
}

export function removeSessionStorage() {
  window.sessionStorage.clear()
}