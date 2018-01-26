export function onLoginStateCheckFaild(to, from, next) {
  console.log('onLoginStateCheckFaild')
}

export function onSendAjaxRespErr() {
  return false
}

export function onSessionTimeOut({callback} = {}) {
  console.log('onSessionTimeOut')
}
