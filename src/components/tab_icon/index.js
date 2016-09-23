import React from 'react'
// import Icon from 'react-native-vector-icons/FontAwesome'
// <Icon style={{color: color}} name={this.props.iconName} size={30} />

import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

export default class TabIcon extends React.Component {
  render () {
    const color = this.props.selected ? '#000' : '#666'
    const textStyle = {
      alignSelf: 'center',
      fontSize: 12,
      fontWeight: '500',
      color: color,
    }
    return (
      <View style={styles.container}>
        <Text style={textStyle}>{this.props.title.toUpperCase()}</Text>
      </View>
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#000',
    padding: 5,
    justifyContent: 'center',
  },
})