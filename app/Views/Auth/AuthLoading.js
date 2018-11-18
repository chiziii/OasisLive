import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LBDataStore from 'app/Services/Store';
import { defaultKeys } from 'app/Utils/DefaultKeys';
import SInfo from 'react-native-sensitive-info';

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._LBDataStore = new LBDataStore();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    this._LBDataStore._GetSecureData(defaultKeys.access_token, (token) => {
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(token ? 'Root' : 'Auth');
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
