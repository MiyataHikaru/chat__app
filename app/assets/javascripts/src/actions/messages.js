import request from 'superagent'
import Dispatcher from '../dispatcher'
import {CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: 'updateOpenChatID',
      userID: newUserID,
    })
  }, // 改行する
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: 'sendMessage',
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  }, // 改行する
  loadMessage(chatID) {
    return new Promise((resolve, reject) => {
      request
      .get(`http://localhost:3000/api/messages/${chatID}`)
      // .end((error, res) => {
      .end(function(err, res) {
        // 変数errorを使う
        // つまり、
        // if (!error && res.ok) {
        if (res.ok) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: 'loadMessage',
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },

  // sendMessageは既に12行目で定義してるよ？おかしくない？
  sendMessage(chatID, content) {
    return new Promise((resolve, reject) => {
      request
      .post(`http://localhost:3000/api/messages/${chatID}`)
      .send({content, 'chat_id': chatID})
      .set('X-CSRF-Token', CSRFToken()) // これを上のloadMessageにも追加する
      // この辺も上にならって直す
      .end(function(err, res) {
        if (res.ok) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: 'sendMessage',
            content,
            chatID,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
