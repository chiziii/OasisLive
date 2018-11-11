import SInfo from 'react-native-sensitive-info';
import NetworkRequests from 'app/Services/Http/Requests/';
import { defaultKeys } from 'app/Utils/DefaultKeys';
import LBDataStore from 'app/Services/Store';

const networkRequests = new NetworkRequests();
const lbDataStore = new LBDataStore();

export default class AuthController {
  authenticate(payload, url, success, fail){
    networkRequests.request(url, HTTPMethods.POST, payload,
      (response) => {
        if(response.data.status === 'error') {
          return fail(response.data);
        }
        lbDataStore._SecureDataStore(
          defaultKeys.access_token,
          response.data.data.access_token,
          (value)  => {
            success(true)}
        )
      },
      (error) => {return fail(error)}
    );
  }

  logout(success){
    lbDataStore._RemoveSecureData(
      defaultKeys.access_token,
      (value)  => {
        success(true)}
    )
  }
}
