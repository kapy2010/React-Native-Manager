/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import firebase from 'firebase';
import reducers from './src/reducers';
import credentials from './credentials.json';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: credentials.apiKey,
      authDomain: credentials.authDomain,
      databaseURL: credentials.databaseURL,
      projectId: credentials.projectId,
      storageBucket: credentials.storageBucket,
      messagingSenderId: credentials.messagingSenderId
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <LoginForm/>
        </View>
      </Provider>
    );
  }
}
