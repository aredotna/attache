import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import LoginForm from '../components/login_form/index.js';
import React from 'react';
import I18n from 'react-native-i18n';
const { LOGIN } = require('../lib/constants').default;

function mapStateToProps (state) {
  return {
    auth: state.auth,
    global: state.global
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

const Login = React.createClass({

  render () {
    return (
      <LoginForm
        formType={LOGIN}
        loginButtonText={I18n.t('Login.login')}
        displayPasswordCheckbox
        auth={this.props.auth}
        global={this.props.global}
        actions={this.props.actions}
      />
    );
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
