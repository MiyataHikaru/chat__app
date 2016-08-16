import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../app'
import MessagesAction from '../actions/messages'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadMessage(2))
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }

  loadMessage(chatId, ctx, next) {
    MessagesAction.loadMessage(chatId)
  }
}
