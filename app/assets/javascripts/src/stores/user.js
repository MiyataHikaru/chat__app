import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import MessagesStore from './messages'

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
    return this.get('following')
  }

  setFollowing(obj) {
    this.set('following', obj)
    MessagesStore.setFirstOpenChatUserID()
  }

  getLastMessages() {
    if (!this.get('last_messages')) this.set('last_messages', [])
    return this.get('last_messages')
  }

  setLastMessages(obj) {
    this.set('last_messages', obj)
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
      const {following, last_messages} = payload.action
      UsersStore.setFollowing(following)
      UsersStore.setLastMessages(last_messages)
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
