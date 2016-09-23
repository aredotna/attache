import store from 'react-native-simple-store'
import CONFIG from './config'

export default class CurrentUser {
  constructor () {
    this.CURRENT_USER_KEY_KEY = 'CurrentUser';
  }

  storeCurrentUser (user) {
    return store.save(this.CURRENT_USER_KEY_KEY, {
      user
    })
  }

  getCurrentUser () {
    return store.get(this.CURRENT_USER_KEY_KEY)
  }

  deleteCurrentUser () {
    return store.delete(this.CURRENT_USER_KEY_KEY)
  }
}

