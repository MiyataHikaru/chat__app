import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'
import MessagesStore from '../stores/messages'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadMessage, this.loadFollowing, this.loadFollowers, this.loadCurrentUser)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }

  loadMessage(ctx, next) {
    MessagesAction.loadMessage(1)
    next()
  }

  loadFollowing(ctx, next) {
    UsersAction.loadFollowing()
    next()
  }

  loadFollowers(ctx, next) {
    UsersAction.loadFollowers()
    next()
  }

  loadCurrentUser(ctx, next) {
    UsersAction.loadCurrentUser()
    next()
  }
}
