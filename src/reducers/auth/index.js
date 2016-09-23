const InitialState = require('./initial_state').default;
const fieldValidation = require('../../lib/field_validation').default;
const formValidation = require('./form_validation').default;

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
  SET_STATE
} = require('../../lib/constants').default

const initialState = new InitialState();

export default function authReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    case SESSION_TOKEN_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
      let nextState = state.setIn(['form', 'isFetching'], true)
        .setIn(['form', 'error'], null)
      return nextState

    case LOGOUT:
      return formValidation(
        state.setIn(['form', 'state'], action.type)
          .setIn(['form', 'error'], null)
          .setIn(['form', 'fields', 'email'], '')
          .setIn(['form', 'fields', 'password'], '')
      )

    case LOGIN:
      return formValidation(
        state.setIn(['form', 'state'], action.type)
        .setIn(['form', 'error'], null)
    )


    case ON_AUTH_FORM_FIELD_CHANGE: {
      const { field, value } = action.payload;
      let nextState = state.setIn(['form', 'fields', field], value);

      return formValidation(
        fieldValidation(nextState, action),
        action
      );
    }

    case SESSION_TOKEN_SUCCESS:
    case SESSION_TOKEN_FAILURE:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return state.setIn(['form', 'isFetching'], false)

    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
      return state.setIn(['form', 'isFetching'], false)
        .setIn(['form', 'error'], action.payload)

    case DELETE_TOKEN_REQUEST:
    case DELETE_TOKEN_SUCCESS:
      return state

    default:
      return state

  }
}
