import React from 'react'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
import MessagesAction from '../../actions/messages'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      followingUsers: UsersStore.getFollowing(),
      lastMessages: UsersStore.getLastMessages(),
      openChatId: MessagesStore.getOpenChatUserID(),
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    UsersStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
    UsersStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }

  render() {
    const {
      followingUsers,
      lastMessages,
      openChatId,
    } = this.state
    const followings = followingUsers.map((following) => {
      const {id, image, name} = following
      const lastMessage = lastMessages[id]
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': openChatId === id,
      })
      const imagePath = image
        ? `user_images/${image}`
        : 'assets/hituji.png'

      return (
        <li
          onClick={this.changeOpenChat.bind(this, id)}
          className={itemClasses}
          key={id}
          deta-remote='true'
        >
          <div className='user-list__item__picture'>
            <img src={imagePath} />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              {name}
            </h4>
            {lastMessage
              ? <h5 className='last-message'>
                  {lastMessage.content}
                </h5>
              : null
            }
          </div>
          <a
            className='fa fa-times destroy-friend'
            href={`/unfollow/${id}`}
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
