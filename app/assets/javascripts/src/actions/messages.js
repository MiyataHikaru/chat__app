import request from 'superagent'
import Dispatcher from '../dispatcher'
import {CSRFToken} from '../constants/app'

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
  loadMessage(userId) {
    return new Promise((resolve, reject) => {
      request
      .get(`http://localhost:3000/api/messages/${userId}`)
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

  sendMessage(userId, content) {
    return new Promise((resolve, reject) => {
      request
      .post(`http://localhost:3000/api/messages/${userId}`)
      .send({content, 'user_id': userId})
      .set('X-CSRF-Token', CSRFToken())
      .end(function(err, res) {
        if (res.ok) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: 'sendMessage',
            content,
            userId,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
