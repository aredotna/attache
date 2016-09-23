const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  LOGIN,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,

  SET_CURRENT_USER
} = require('../../lib/constants').default;

import Arena from '../../lib/arena'
import { Actions } from 'react-native-router-flux'
import AuthToken from '../../lib/auth_token';
import CurrentUser from '../../lib/current_user';
import _ from 'lodash'

export function logoutState () {
  return {
    type: LOGOUT
  }
}

export function loginState () {
  return {
    type: LOGIN
  }
}

export function logoutRequest () {
  return {
    type: LOGOUT_REQUEST
  }
}

export function logoutSuccess () {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logoutFailure (error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  }
}

export function logout () {
  return dispatch => {
    dispatch(loginState())
    dispatch(logoutSuccess())
    dispatch(deleteSessionToken())
    Actions.Login()
  }
}

export function onAuthFormFieldChange (field, value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: {
      field: field,
      value: value,
    },
  }
}

export function sessionTokenRequest () {
  return {
    type: SESSION_TOKEN_REQUEST
  }
}
export function sessionTokenRequestSuccess (token) {
  return {
    type: SESSION_TOKEN_SUCCESS,
    payload: token
  }
}
export function sessionTokenRequestFailure (error) {
  return {
    type: SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error
  }
}

export function deleteTokenRequest () {
  return {
    type: DELETE_TOKEN_REQUEST
  }
}
export function deleteTokenRequestSuccess () {
  return {
    type: DELETE_TOKEN_SUCCESS
  }
}

export function deleteSessionToken () {
  return dispatch => {
    dispatch(deleteTokenRequest())
    return new AuthToken().deleteSessionToken()
      .then(() => {
        dispatch(deleteTokenRequestSuccess())
      })
  }
}

export function getSessionToken () {
  return dispatch => {
    dispatch(sessionTokenRequest())
    return new AuthToken().getSessionToken()
      .then((token) => {
        if (token) {
          dispatch(sessionTokenRequestSuccess(token))
          dispatch(logoutState())
          return new CurrentUser().getCurrentUser()
            .then((user) => {
              dispatch(currentUserSuccess(user.user))
              return Actions.Menu()
            })
            .catch((error) => {
              console.log('some error occurred getting token', error)
            })
        } else {
          dispatch(sessionTokenRequestFailure())
          Actions.Login()
        }
      })

      .catch((error) => {
        dispatch(sessionTokenRequestFailure(error))
        dispatch(loginState())
        Actions.Login()
      })
  }
}

export function saveSessionToken (json) {
  return new AuthToken().storeSessionToken(json)
}

export function saveCurrentUser (json) {
  return new CurrentUser().storeCurrentUser(json)
}

export function loginRequest () {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess (json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json
  }
}

export function loginFailure (error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}

export function currentUserSuccess (data) {
  return {
    type: SET_CURRENT_USER,
    payload: data
  }
}

export function login (email, password) {
  let token

  return dispatch => {
    dispatch(loginRequest())
    return new Arena().login({
      email: email,
      password: password
    })
    .then((json) => {
      token = json
      return saveSessionToken(json)
    })
    .then(() => {
      return new Arena(token).getUser()
        .then((user) => {
          return saveCurrentUser(user)
            .then(() => {
              dispatch(loginSuccess(user))
              dispatch(currentUserSuccess(user))
              Actions.Menu()
            })
            .catch((error) => {
              console.log('error occurred logging in', error)
              dispatch(loginSuccess(user))
              dispatch(currentUserSuccess(user))
              Actions.Menu()
            })
        })
    })
    .catch((error) => {
      dispatch(loginFailure(error))
    })
  }
}