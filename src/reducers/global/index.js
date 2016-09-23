const {
  SET_SESSION_TOKEN,
  LOGIN_SUCCESS,
  SESSION_TOKEN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_CURRENT_USER,
  GET_STATE,
  SET_STATE,
  SET_STORE
} = require('../../lib/constants').default

import InitialState from './initial_state'

const initialState = new InitialState()

export default function globalReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    case SET_SESSION_TOKEN:
      return state.set('sessionToken', action.payload)
    case SET_CURRENT_USER:
      return state.set('currentUser', action.payload)
    case LOGOUT_SUCCESS:
      return state.set('currentUser', null)
    default:
      return state
  }
}
