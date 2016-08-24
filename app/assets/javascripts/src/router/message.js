import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../app'
import UsersAction from '../actions/users'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadFollowing, this.loadCurrentUser)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
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
