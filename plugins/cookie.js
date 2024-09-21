// plugins/cookie.js
import Cookies from 'js-cookie'

export default ({ app }, inject) => {
  // Inject $cookies in Vue instances
  inject('cookies', Cookies)
}
