import { Record } from 'immutable'
const { LOGIN } = require('../../lib/constants').default

const Form = Record({
  state: LOGIN,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: new (Record({
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    password: '',
    passwordHasError: false,
    passwordErrorMsg: ''
  }))
})

const InitialState = Record({
  form: new Form()
})

export default InitialState

