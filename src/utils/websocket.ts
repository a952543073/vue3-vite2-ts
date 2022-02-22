/*
 * @Author: ShiJunJie
 * @Date: 2021-11-25 15:40:15
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 16:44:47
 * @Descripttion: WebSocket工具方法
 */

let websocket: WebSocket = null
const initWebSocket = (url: string | URL) => {
  if ('WebSocket' in window) {
    websocket = new WebSocket(url)
    // 连接错误
    websocket.onerror = setErrorMessage
    // 连接成功
    websocket.onopen = setOnopenMessage
    // 收到消息的回调
    websocket.onmessage = setOnmessageMessage
    // 连接关闭的回调
    websocket.onclose = setOncloseMessage
    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = onbeforeunload
    return websocket
  } else {
    alert('当前浏览器不支持 websocket')
  }
}

const setErrorMessage = () => {
  console.log('WebSocket连接发生错误   状态码：' + websocket.readyState)
}
const setOnopenMessage = () => {
  console.log('WebSocket连接成功    状态码：' + websocket.readyState)
}

const setOnmessageMessage = (event: { data: any }) => {
  // 服务器推送的消息
  console.log('服务器推送的消息', event.data)
}

const setOncloseMessage = () => {
  console.log('WebSocket连接关闭    状态码：' + websocket.readyState)
}
const onbeforeunload = () => {
  closeWebSocket()
}

const closeWebSocket = () => {
  websocket.close()
}

export default {
  init: initWebSocket,
}
