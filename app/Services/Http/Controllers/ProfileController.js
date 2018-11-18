import SInfo from 'react-native-sensitive-info';
import errorHandler from 'app/Utils/ErrorHandler';
import Config from 'LearnBaseApp/Config';
import HTTPMethods from 'app/Services/Http/Requests/HTTPMethods';
import NetworkRequests from 'app/Services/Http/Requests/';
import isValidEmail from 'app/Utils/EmailValidator';
import { defaultKeys } from 'app/Utils/DefaultKeys';
import api from 'app/Services/Http/Routes/api';
import LBDataStore from 'app/Services/Store';
import { AsyncStorage } from "react-native";

const _NetworkRequests = new NetworkRequests();
const lbDataStore = new LBDataStore();
const user_url = `${Config.api_base_url}${api.USER}`;

export default class ProfileController {

  async _getFromAPI(){
    headers = await _NetworkRequests._getAuthHeader()//abiodun adeyemi, 15
    let result = await _NetworkRequests._requestWithConfig(user_url, HTTPMethods.GET, {}, headers)
    return result;
  }

  async _getFromLocalStore(){
    const value = await AsyncStorage.getItem(defaultKeys.user);
    alert(value)
    if (value !== null) {
      // We have data!!
      return JSON.stringify(value);
    }
  }
}
