import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native'

const { LOGIN } = require('../../lib/constants').default

import I18n from 'react-native-i18n'
import stylesheet from '../../styles/form'

import t from 'tcomb-form-native'
const Form = t.form.Form

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: {
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password,
      }
    }
  }

  onChange(value) {
    this.setState({value});
  }

  onPress(login, email, password) {
    login(email, password);
  }

  render() {
    let onButtonPress = this.onPress.bind(
      null,
      this.props.actions.login,
      this.state.value.email,
      this.state.value.password
     );

    let email = {
      label: I18n.t('LoginForm.email'),
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      placeholder: I18n.t('LoginForm.email'),
      editable: !this.props.auth.form.isFetching,
      hasError: this.props.auth.form.fields.emailHasError,
      error: this.props.auth.form.fields.emailErrorMsg
    };

    let password = {
      label: I18n.t('LoginForm.password'),
      maxLength: 12,
      secureTextEntry: true,
      placeholder: I18n.t('LoginForm.password'),
      editable: !this.props.auth.form.isFetching,
      hasError: this.props.auth.form.fields.passwordHasError,
      error: this.props.auth.form.fields.passwordErrorMsg
    };

    let loginForm = t.struct({
      email: t.String,
      password: t.String
    });

    let options = {
      stylesheet: stylesheet,
      fields: {
        email,
        password
      }
    }

    let self = this;

    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/images/icon.png')} style={styles.icon}/>
        <Form ref='form'
          type={loginForm}
          options={options}
          value={this.state.value}
          onChange={self.onChange.bind(self)}
        />
        <TouchableHighlight style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 40,
  },
  icon: {
    width: 76,
    height: 76,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'center',
    fontWeight: '500'
  },
  button: {
    height: 36,
    borderTopColor: '#000',
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  }
})

export default Login