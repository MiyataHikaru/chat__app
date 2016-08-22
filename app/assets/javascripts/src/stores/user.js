import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'

const UserStore = {
  user: {
    id: 1,
    name: 'John Doek',
    profilePicture: 'https://avatars1.githubusercontent.com/u/8901351?v=3&s=200',
  },
}

let json = []

class ChatUserStore extends BaseStore {
  getJson() {
    return { users: json }
  }
}
const UsersStore = new ChatUserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    loadUser(payload) {
      json = payload.action.json
      UsersStore.emitChange()
    },
  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})


export default UserStore // この上の改行消す
export default UsersStore
// UserStoreとUsersStoreが同じファイルにあるのは変
// というかどっちかで事足りるはず
