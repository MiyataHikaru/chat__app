import request from 'superagent'
import Dispatcher from '../dispatcher'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: 'updateOpenChatID',
      userID: newUserID,
    })
  },
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: 'sendMessage',
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },
  loadMessage(chatID) {
    return new Promise((resolve, reject) => {
      request
      .get(`http://localhost:3000/api/messages/${chatID}`)
      .end(function(err, res) {
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
}
