import request from 'superagent'
import Dispatcher from '../dispatcher'
import {CSRFToken} from '../constants/app'

export default {
  loadUser() {
    return new Promise((resolve, reject) => {
      request
      .get('http://localhost:3000/api/search')
      .end(function(err, res) {
        if (res.ok) {
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
}
