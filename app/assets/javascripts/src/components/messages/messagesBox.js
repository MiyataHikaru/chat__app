import React from 'react'
import _ from 'lodash'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import UsersStore from '../../stores/user'

class MessagesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getJsonFromStore()
  }

  getJsonFromStore() {
    return {
      currentUser: UsersStore.getCurrentUser(),
      messages: MessagesStore.getJson(),
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
    this.setState(this.getJsonFromStore())
  }

  render() {
    const {messages, currentUser} = this.state
    const currentUserID = currentUser.id
    const ChatMessages = messages.map((message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from === currentUserID,
        'clear': true,
      })
      const isImage = !_.isEmpty(messages.file)

      return (
        <li
          key={message.id}
          className={messageClasses}
        >
          <div className={`message-box__item__${isImage ? 'image' : 'contents'}`} >
            {isImage
              ? <img src={`message_images/${message.file}`} />
              : message.content
            }
          </div>
        </li>
      )
    })

    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            {ChatMessages}
          </ul>
          <ReplyBox />,
        </div>
      )
  }
}

export default MessagesBox
