import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import UsersStore from '../../stores/user'
// import Utils from '../../utils'

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
      current_user: UsersStore.getCurrentUser(),
      messages: MessagesStore.getJson()
    }
  }
// あまり理解できていない。
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this)),
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
// あまり理解できていない。
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this)),
    UsersStore.onChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getJsonFromStore())
  }
  render() {
    // const messagesLength = this.state.messages.length
    const currentUserID = this.state.current_user.id
    const messages = this.state.messages.map((message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from === currentUserID,
        'clear': true,
      })
    if (message.file) {
      return (
        <li
          key={ message.id }
          className={ messageClasses }
        >
          <div className='message-box__item__image'>
            <img src={`message_images/${message.file}`} />
          </div>
        </li>
      )
    } else {
      return (
        <li
          key={ message.id }
          className={ messageClasses }
        >
          <div className='message-box__item__contents'>
            { message.content }
          </div>
        </li>
      )
    }


    })

    // const lastMessage = this.state.messages[messagesLength - 1]

    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }

    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox />,
        </div>
      )
  }
}

export default MessagesBox
