import store from 'react-native-simple-store'
import CONFIG from './config'

export default class AuthToken {
  constructor () {
    this.SESSION_TOKEN_KEY = 'AuthToken';
  }

  storeSessionToken (sessionToken) {
    return store.save(this.SESSION_TOKEN_KEY, {
      sessionToken: sessionToken.token
    })
  }

  getSessionToken (sessionToken) {
    if (sessionToken) {
      return store.save(this.SESSION_TOKEN_KEY, {
        sessionToken: sessionToken
      }).then(() => {
        return store.get(this.SESSION_TOKEN_KEY)
      })
    }
    return store.get(this.SESSION_TOKEN_KEY)
  }

  deleteSessionToken () {
    return store.delete(this.SESSION_TOKEN_KEY)
  }
}

