import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
import MessagesAction from '../../actions/messages'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getFollowingFromStore()
  }

  getFollowingFromStore() {
    return UsersStore.getFollowing()
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getFollowingFromStore())
  }
  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
    MessagesAction.loadMessage(id)
  }

  render() {
    // this.state.messageList.sort((a, b) => {
    //   if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
    //     return -1
    //   }
    //   if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
    //     return 1
    //   }
    //   return 0
    // })

    const followings = this.state.followings.map((following) => {
      // const date = Utils.getNiceDate(message.lastMessage.timestamp)

      // var statusIcon
      // if (message.lastMessage.from !== message.user.id) {
      //   statusIcon = (
      //     <i className='fa fa-reply user-list__item__icon' />
      //   )
      // }
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   statusIcon = (
      //     <i className='fa fa-circle user-list__item__icon' />
      //   )
      // }

      // var isNewMessage = false
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   isNewMessage = message.lastMessage.from !== UserStore.user.id
      // }

      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        // 'user-list__item--new': isNewMessage,
        'user-list__item--active': this.state.openChatID === following.id,
      })

      return (
        <li
        // 結局ここの引数で出てくるメッセージを選んでる。
          onClick={ this.changeOpenChat.bind(this, following.id) }
          className={ itemClasses }
          key={ following.id }
        >
          <div className='user-list__item__picture'>
            <img src={`/user_images/${following.image}`} />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { following.name }
            </h4>
          </div>
          <a
            className='fa fa-times destroy-friend'
            href={`/unfollow/${following.id}`}
            data-method='delete'
            >
          </a>
        </li>
      )
    }, this)

    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { followings }
        </ul>
      </div>
    )
  }
}

export default UserList
