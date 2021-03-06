import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'

class ReplyBox extends React.Component {

  static get defaultProps() {
    return {
    }
  }

  static get propTypes() {
    return {
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  get initialState() {
    return {
      value: '',
    }
  }

  handleKeyDown(e) {
    const {value} = this.state
    // １３はエンターキーを押したとき
    if (e.keyCode === 13 && value !== '') {
      MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), value)
      MessagesAction.loadMessage(MessagesStore.getOpenChatUserID())
      UsersAction.loadFollowing()
      this.setState({
        value: '',
      })
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  uploadImage(e) {
    MessagesAction.uploadImage(MessagesStore.getOpenChatUserID(), e.target.files[0])
    MessagesAction.loadMessage(MessagesStore.getOpenChatUserID())
  }

  render() {
    const {value} = this.state
    return (
      <div className='reply-box'>
        <input
          value={ value }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.updateValue }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
        <input
          className='file-input'
          type='file'
          ref='image'
          onChange={ this.uploadImage }
        />
      </div>
    )
  }
}

export default ReplyBox
