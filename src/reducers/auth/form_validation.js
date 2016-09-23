const {
  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../../lib/constants').default

export default function formValidation (state) {
  switch (state.form.state) {

    case LOGOUT:
      return state.setIn(['form', 'isValid'], true)

    case LOGIN:
      if (state.form.fields.email !== '' &&
          state.form.fields.password !== '' &&
          !state.form.fields.emailHasError &&
          !state.form.fields.passwordHasError) {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }

  }
  /**
   * Default, return the state
   */
  return state
}
