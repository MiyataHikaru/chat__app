import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'

let json = []
let following = []
let followers = []

class ChatUserStore extends BaseStore {
  getJson() {
    return { users: json }
  }

  getFollowing() {
    return { followings: following }
  }

  getFollowers() {
    return { followers: followers }
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
  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})

export default UsersStore
