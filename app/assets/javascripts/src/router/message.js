import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadMessage, this.loadFollowing, this.loadCurrentUser)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }

  loadMessage(ctx, next) {
    // 仮に１にしてるだけで、一番上にする
    MessagesAction.loadMessage(1)
    next()
  }

  loadFollowing(ctx, next) {
    UsersAction.loadFollowing()
    next()
  }

  loadCurrentUser(ctx, next) {
    UsersAction.loadCurrentUser()
    next()
  }
}
