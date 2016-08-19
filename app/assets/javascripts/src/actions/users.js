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
  loadFollowing() {
    return new Promise((resolve, reject) => {
      request
      .get('http://localhost:3000/api/following')
      .end(function(err, res) {
        if (res.ok) {
          const following = JSON.parse(res.text)
          resolve()
          Dispatcher.handleServerAction({
            type: 'loadFollowing',
            following: following,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  loadFollowers() {
    return new Promise((resolve, reject) => {
      request
      .get('http://localhost:3000/api/followers')
      .end(function(err, res) {
        if (res.ok) {
          const followers = JSON.parse(res.text)
          resolve()
          Dispatcher.handleServerAction({
            type: 'loadFollowers',
            followers: followers,
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
        if (res.ok) {
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
  }
}
