import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UsersStore from './user'
import MessagesAction from '../actions/messages'
import _ from 'lodash'

// const hoge = UsersStore.getFollowing()[0]
let openChatID = -1
let json = []

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
    // console.log('hoge')
    // MessagesAction.loadMessage(openChatID)
    return openChatID
  }
  getJson() {
    return json
  }
}

const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    updateOpenChatID(payload) {
      openChatID = payload.action.userID
      MessagesStore.emitChange()
    },

    loadMessage(payload) {
      json = payload.action.json
      console.log(json)
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
