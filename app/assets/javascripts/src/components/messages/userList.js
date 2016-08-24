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
    return this.getFollowingFromStore()
  }

  getFollowingFromStore() {
    return {
      followingUsers: UsersStore.getFollowing(),
      openChatId: MessagesStore.getOpenChatUserID(),
    }
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    UsersStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
    UsersStore.onChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getFollowingFromStore())
  }

  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }

  render() {
    const {followingUsers, openChatId} = this.state
    const followings = followingUsers.map((following) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': openChatId === following.id,
      })
      if (following.image) {
        return (
          <li
            onClick={ this.changeOpenChat.bind(this, following.id) }
            className={ itemClasses }
            key={ following.id }
            deta-remote='true'
          >
            <div className='user-list__item__picture'>
              <img src={`user_images/${following.image}`} />
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
      } else {
        return (
          <li
            onClick={ this.changeOpenChat.bind(this, following.id) }
            className={ itemClasses }
            key={ following.id }
          >
            <div className='user-list__item__picture'>
              <img src='assets/hituji.png' />
            </div>
            <div className='user-list__item__details'>
              <h4 className='user-list__item__name'>
                { following.name }
              </h4>
            </div>
            <div className='last-message'>
            </div>
            <a
              className='fa fa-times destroy-friend'
              href={`/unfollow/${following.id}`}
              data-method='delete'
              >
            </a>
          </li>
        )
      }
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
