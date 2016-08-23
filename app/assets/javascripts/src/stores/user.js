import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'

class ChatUserStore extends BaseStore {
  getJson() {
    if (!this.get('users')) this.set('users', [])
    return this.get('users')
  }

  setJson(obj) {
    this.set('users', obj)
  }

  getFollowing() {
    if (!this.get('following')) this.set('following', [])
    // console.log(this._storage)
    return this.get('following')
  }

  setFollowing(obj) {
    this.set('following', obj)
    console.log(this._storage)
  }

  getCurrentUser() {
    if (!this.get('current_user')) this.set('current_user', {})
    return this.get('current_user')
  }

  setCurrentUser(obj) {
    this.set('current_user', obj)
  }
}
const UsersStore = new ChatUserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    loadUser(payload) {
      const {json} = payload.action
      UsersStore.setJson(json)
      UsersStore.emitChange()
    },

    loadFollowing(payload) {
      const {following} = payload.action
      UsersStore.setFollowing(following)
      UsersStore.emitChange()
    },

    loadCurrentUser(payload) {
      const {current_user} = payload.action
      UsersStore.setCurrentUser(current_user)
      UsersStore.emitChange()
    },
  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})
window.UsersStore = UsersStore
export default UsersStore
