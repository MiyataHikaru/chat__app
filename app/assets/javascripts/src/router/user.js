import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import SearchBox from '../components/users/searchBox'
import UsersAction from '../actions/users'

export default class SearchRouter extends BaseRouter {
  register() {
    this.route('/search', this.decorateSearchBox, this.loadUser)
  }

  decorateSearchBox(ctx, next) {
    (new ReactDecorator()).decorate('react-search', SearchBox)
    next()
  }

  loadUser(ctx, next) {
    UsersAction.loadUser()
    next()
  }
}
