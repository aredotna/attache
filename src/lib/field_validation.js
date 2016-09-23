import _ from 'lodash'
import validate from 'validate.js'
import I18n from 'react-native-i18n'

const emailConstraints = {
  from: {
    email: true
  }
}

const passwordPattern = /[^']{6,}?/
const passwordConstraints = {
  password: {
    format: {
      pattern: passwordPattern,
      flags: 'i'
    }
  }
}

export default function fieldValidation (state, action) {
  const {field, value} = action.payload

  switch (field) {
    case ('email'):
      let validEmail = _.isUndefined(validate({from: value},
                                             emailConstraints))
      if (validEmail) {
        return state.setIn(['form', 'fields', 'emailHasError'], false)
      } else {
        return state.setIn(['form', 'fields', 'emailHasError'], true)
        .setIn(['form', 'fields', 'emailErrorMsg'],
                 I18n.t('FieldValidation.valid_email'))
      }

    case ('password'):
      let validPassword = _.isUndefined(validate({password: value},
                                               passwordConstraints))
      if (validPassword) {
        return state.setIn(['form', 'fields', 'passwordHasError'],
                         false)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
               '')
      } else {
        return state.setIn(['form', 'fields', 'passwordHasError'], true)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
          I18n.t('FieldValidation.valid_password'))
      }

  }
  return state;
}
