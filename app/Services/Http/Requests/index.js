import axios from 'axios';
import HTTPMethods from './HTTPMethods';
import NetworkInfo from 'app/Services/Http/Requests/NetworkInfo';
import { defaultKeys } from 'app/Utils/DefaultKeys';
import LBDataStore from 'app/Services/Store';
import SInfo from 'react-native-sensitive-info';

const _NetworkInfo = new NetworkInfo();
const _LBDataStore = new LBDataStore();

const options = {
  sharedPreferencesName: defaultKeys.sharedPreferencesName,
  keychainService: defaultKeys.keychainService
}

export default class NetworkRequests {

  async _getToken(){
    let response = await SInfo.getItem(defaultKeys.access_token, options);
    // let token = await response;
    return response;

  }

  async _getAuthHeader(){
    token = await this._getToken();
    return {
      'authorization': `${defaultKeys.token_type} ${token}`
    };
  }

  _get(endpoint, success, fail){
    axios.get(endpoint)
      .then(function (response) {
        // handle success
        console.log(response);
        success(response);
      })
      .catch(function (error) {
        // handle error
        // alert(error);
        fail(error);
      })
  }

  async _requestWithConfig(endpoint, Method, payload = {}, headers){
    let request = await axios({
      url: endpoint,
      method: Method,
      headers: headers,
    });
    return request
  }

  _post(endpoint, Method, payload, success, fail){
    axios.post(endpoint, payload)
      .then(function (response) {
        // handle success
        console.log(response);
        success(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        fail(error);
      })
  }



  request(endpoint, Method, payload = {}, success, fail){
    _NetworkInfo._getInternetStatus();

    switch (Method) {
      case HTTPMethods.GET:
        this._get(endpoint,
          (response) => {
            // return alert('Success data from Requests ===> ' + JSON.stringify(response.data))
            return success(response)
          },
          (error) => {

            return fail(error)
          }
        );
        break;
      case HTTPMethods.POST:
        if (payload.length === 0){
          return fail({'error': 'Empty payload', 'message': 'Payload cannot be empty for a post request. Kindly check the payload'});
        }

        this._post(endpoint, Method, payload,
          (data) => {return success(data)},
          (error) => {return fail(error)}
        );
        break;
      default:
        return;
    }
  }
}
