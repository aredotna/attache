import React from 'react'
import I18n from 'react-native-i18n'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../actions/auth'
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native'

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

const App = React.createClass({
  componentDidMount () {
    // this.props.actions.deleteSessionToken()
    this.setTimeout(() => {
      this.props.actions.getSessionToken()
    }, 1000)
  },
  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/icon.png')} style={styles.icon}/>
      </View>
    );
  }
})

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
})

reactMixin(App.prototype, TimerMixin)

export default connect(mapStateToProps, mapDispatchToProps)(App)
