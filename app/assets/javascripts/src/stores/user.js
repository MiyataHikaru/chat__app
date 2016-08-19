import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'

let json = []
let following = []
let followers = []
let current_user = []

class ChatUserStore extends BaseStore {
  getJson() {
    return json
  }

  getCurrentUser() {
    return current_user
  }

  getFollowing() {
    return following
  }

  getFollowers() {
    return followers
  }

}
const UsersStore = new ChatUserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    loadUser(payload) {
      json = payload.action.json
      UsersStore.emitChange()
    },
    loadFollowing(payload) {
      following = payload.action.following
      UsersStore.emitChange()
    },
    loadFollowers(payload) {
      followers = payload.action.followers
      UsersStore.emitChange()
    },
    loadCurrentUser(payload) {
      current_user = payload.action.current_user
      UsersStore.emitChange()
    }
  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})
window.UsersStore = UsersStore
export default UsersStore
