import React from 'react'
import UsersStore from '../../stores/user'
import UsersAction from '../../actions/users'
import _ from 'lodash'
import MessagesAction from '../../actions/messages'

export default class SearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.updateValue = this.updateValue.bind(this)
  }

  get initialState() {
    return this.getJsonFromStore()
    return {
      value: '',
    }
  }

  getJsonFromStore() {
    return UsersStore.getJson()
  }

// あまり理解できていない。
  componentWillMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
// あまり理解できていない。
  componentWillUnmount() {
    UsersStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getJsonFromStore())
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    }),
    UsersAction.loadUser()
  }

  render() {
    const users = this.state.users.map((user) => {
      if (!_.isEmpty(this.state.value) && user.name.indexOf(this.state.value) >= 0) {
        return (
          <a
            className='user-box'
            href={`/follow/${user.id}`}
            data-method='post'
            >
            <img src="assets/hituji.png" />
            <div className='user-name'>
              {user.name}
            </div>
            <div className='user-content'>
              {user.content}
            </div>
          </a>
        )
      }
    })

    return (
      <div className='search-wrapper'>
        <h1>ユーザー検索</h1>
        <div className='search-box'>
          <input
            value={this.state.value}
            onKeyDown= {this.handleKeyDown}
            onChange= {this.updateValue}
            className='search-box-input'
            placeholder='Seaech'
            autoFocus={true}
          />
          <div className='index-user-list'>
            { users }
          </div>
        </div>
      </div>
    )
  }
}
