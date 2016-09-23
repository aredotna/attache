const {
  SET_SESSION_TOKEN,
} = require('../../lib/constants').default

export function setSessionToken (sessionToken) {
  return {
    type: SET_SESSION_TOKEN,
    payload: sessionToken
  }
}