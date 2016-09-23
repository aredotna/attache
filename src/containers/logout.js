import React from 'react'
import I18n from 'react-native-i18n'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import Button from 'apsl-react-native-button'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../actions/auth'

function mapStateToProps (state) {
  return {
    currentUser: state.global.currentUser,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch)
  }
}


class Logout extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.actions.logout()}>
          Yes, log out
        </Button>
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
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Logout)
