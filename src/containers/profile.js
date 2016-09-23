import React from 'react'
import I18n from 'react-native-i18n'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as globalActions from '../actions/global'


function mapStateToProps (state) {
  return {
    currentUser: state.global.currentUser,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...globalActions }, dispatch)
  }
}


const Profile = React.createClass({
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Are.na, {this.props.currentUser.user.username}</Text>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: this.props.currentUser.user.avatar_image.display}}/>
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
  text: {
    fontSize: 32
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
