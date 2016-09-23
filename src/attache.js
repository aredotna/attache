import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { Router, Scene } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import configureStore from './lib/configure_store'

import I18n from 'react-native-i18n'
import translations from './lib/translations'
I18n.fallbacks = true
I18n.translations = translations

import AuthInitialState from './reducers/auth/initial_state'
import GlobalInitialState from './reducers/global/initial_state'

import TabIcon from './components/tab_icon'

import App from './containers/app'
import Login from './containers/login'
import Profile from './containers/profile'
import Logout from './containers/logout'

const styles = StyleSheet.create({
  menu: {
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.01)'
  }
})


function initialState () {
  const _initState = {
    auth: new AuthInitialState(),
    global: new GlobalInitialState(),
  };
  return _initState;
}

export default function native (platform) {
  let Attache = React.createClass({
    render () {
      const store = configureStore(initialState());

      return (
        <Provider store={store}>
          <Router sceneStyle={{ backgroundColor: 'white' }}>
            <Scene key='root' hideNavBar>

              <Scene key='App'
                component={ App }
                type='replace' />

              <Scene key='Login'
                component={ Login }
                type='replace' />

              <Scene key='Menu'
                tabs
                hideNavBar
                tabBarStyle={ styles.menu }
                default='Profile'>

                <Scene key='Profile'
                  title={I18n.t('Profile.profile')}
                  icon={ TabIcon }
                  iconName={ "user" }
                  hideNavBar
                  component={ Profile } />

                <Scene key='Logout'
                  title={I18n.t('Logout.logout')}
                  icon={ TabIcon }
                  iconName={ "logout" }
                  hideNavBar
                  component={ Logout } />

              </Scene>
            </Scene>
          </Router>
        </Provider>
      );
    }
  });
  AppRegistry.registerComponent('attache', () => Attache);
}