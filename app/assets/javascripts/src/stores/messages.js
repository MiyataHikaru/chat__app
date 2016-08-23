import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UsersStore from './user'
import _ from 'lodash'

let openChatID = -1

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getOpenChatUserID() {
    const users = UsersStore.getFollowing()
    if (openChatID === -1 && !_.isEmpty(users)) {
      openChatID = users[0].id
    }
    return openChatID
  }

  getJson() {
    if (!this.get('messages')) this.set('messages', [])
    return this.get('messages')
  }

  setJson(obj) {
    this.set('messages', obj)
  }
}

const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    updateOpenChatID(payload) {
      const {userID} = payload.action
      openChatID = userID
      MessagesStore.emitChange()
    },

    loadMessage(payload) {
      const {json} = payload.action
      MessagesStore.setJson(json)
      MessagesStore.emitChange()
    },

    sendMessage(payload) {
      MessagesStore.emitChange()
    },

  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})

window.MessagesStore = MessagesStore
export default MessagesStore
