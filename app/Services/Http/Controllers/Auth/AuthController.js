import SInfo from 'react-native-sensitive-info';
import NetworkRequests from 'app/Services/Http/Requests/';
import { defaultKeys } from 'app/Utils/DefaultKeys';
import LBDataStore from 'app/Services/Store';
import ProfileController from 'app/Services/Http/Controllers/ProfileController';

const networkRequests = new NetworkRequests();
const lbDataStore = new LBDataStore();
const _ProfileController  = new ProfileController();

export default class AuthController {
  authenticate(payload, url, success, fail){
    networkRequests.request(url, HTTPMethods.POST, payload,
      (response) => {
        if(response.data.status === 'error') {
          return fail(response.data);
        }
        // SInfo.setItem(key, value, options)
        // .then((value) =>
        //     success(value)
        // );
        lbDataStore._SecureDataStore(
          defaultKeys.access_token,
          response.data.data.access_token,
          (value)  => {
            // this._getUser().then(success(true)).catch((error) => {fail(error)})
            success(true)
          }
        )
      },
      (error) => {return fail(error)}
    );
  }

  async _getUser(){
    let result = await _ProfileController._getFromAPI()
    return await AsyncStorage.setItem(defaultKeys.user, JSON.stringify(result.data.data));
  }

  logout(success){
    lbDataStore._RemoveSecureData(
      defaultKeys.access_token,
      (value)  => {
        success(true)}
    )
  }
}
