import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

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
  }

  get initialState() {
    return {
      value: '',
    }
  }
  handleKeyDown(e) {
    // keyCode === 13が何のことなのかわからないからコメントで説明する
    if (e.keyCode === 13) {
      MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      MessagesAction.loadMessage(MessagesStore.getOpenChatUserID())
      // MessagesAction.sendMess(MessagesStore.getOpenChatUserID(), this.state.value)
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
  render() {
    // const {value} = this.state
    // 上記の様にvalueを定義して、
    // 以下のthis.state.valueはvalueに置き換え
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.updateValue}
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
