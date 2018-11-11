import { AsyncStorage } from "react-native";
import SInfo from 'react-native-sensitive-info';
import { defaultKeys } from 'app/Utils/DefaultKeys';

const options = {
  sharedPreferencesName: defaultKeys.sharedPreferencesName,
  keychainService: defaultKeys.keychainService
}
export default class LBDataStore {

  _SecureDataStore(key, value, success){
    //store data in keychain and sharedpreferences for iOS and Android respectively
    SInfo.setItem(key, value, options)
    .then((value) =>
        success(value)
    );
  }

  _GetSecureData(key, success){
    SInfo.getItem(key, options)
    .then(value => {
        success(value);
    });
  }

  _RemoveSecureData(key, success){
    SInfo.deleteItem(key, options)
    .then(value => {
      success(value);
    })
  }

  _storeData(key, value, success, fail){
    if (value.prop && value.constructor === Array) {
      value = JSON.stringify(value)
    }
    AsyncStorage.setItem(key, value, (err) => {
      success(true);
      fail(err);
    });
  }
}
