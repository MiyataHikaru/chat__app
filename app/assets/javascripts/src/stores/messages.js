import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UsersStore from './user'
import _ from 'lodash'
import MessagesAction from '../actions/messages'

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getOpenChatUserID() {
    return this.get('openChatUserID')
  }

  setOpenChatUserID() {
    console.log('ここまでにhoge1まで読み込んでほしい')
    const FollowingUsers = UsersStore.getFollowing()
    if (!_.isEmpty(FollowingUsers)) {
      this.set('openChatUserID', FollowingUsers[0].id)
      MessagesAction.loadMessage(this._storage.openChatUserID)
    }
  }

  updateOpenChatUserID(obj) {
    this.set('openChatUserID', obj)
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
      MessagesStore.updateOpenChatUserID(userID)
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
