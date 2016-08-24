import request from 'superagent'
import Dispatcher from '../dispatcher'

export default {
  loadUser() {
    return new Promise((resolve, reject) => {
      request
      .get('http://localhost:3000/api/search')
      .end(function(err, res) {
        if (!err && res.ok) {
          const json = JSON.parse(res.text)
          resolve(json)
          Dispatcher.handleServerAction({
            type: 'loadUser',
            json: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },

  loadFollowing() {
    return new Promise((resolve, reject) => {
      request
      .get('http://localhost:3000/api/following')
      .end(function(err, res) {
        if (!err && res.ok) {
          const following = JSON.parse(res.text).users
          const last_messages = JSON.parse(res.text).last_messages
          resolve()
          Dispatcher.handleServerAction({
            type: 'loadFollowing',
            following: following,
            last_messages: last_messages,
          })
        } else {
          reject(res)
        }
      })
    })
  },

  loadCurrentUser() {
    return new Promise((resolve, reject) => {
      request
      .get('http://localhost:3000/api/current')
      .end(function(err, res) {
        if (!err && res.ok) {
          const current_user = JSON.parse(res.text)
          resolve()
          Dispatcher.handleServerAction({
            type: 'loadCurrentUser',
            current_user: current_user,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
