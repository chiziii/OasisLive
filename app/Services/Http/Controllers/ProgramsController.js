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

const programs_url = `${Config.api_base_url}${api.PROGRAMS}?company_uuid=${Config.company_id}`;
const _NetworkRequests = new NetworkRequests();
const lbDataStore = new LBDataStore();

export default class ProgramsController {

  _getFromAPI(success, fail){
    try {
      _NetworkRequests.request(programs_url, HTTPMethods.GET, {},
        (response) => {
          // return alert('Success data from Controller ===> ' + JSON.stringify(response.data))
          // this._store(response.data.data, (err) => {fail(err)})
          // alert('Success data from Controller ===> ' + JSON.stringify(response.data.data))
          // JSON.stringify(response.data.data)
          return success(response.data.data);
        },
        (error) => {
          // return alert('error data from Controller ===> ' + JSON.stringify(error))
          return fail(error)
        }
      );
    } catch (e) {
      return fail(e)
    }
  }

  async _store(data, fail){
    // return alert('store data ===>  ' + JSON.stringify(data.slice(0, 10)));
    try {
      await AsyncStorage.setItem(defaultKeys.ProgramsStore, JSON.stringify(data.slice(0, 10)))
    } catch (e) {
      return fail(e)
    }
  }

  //get from store first, if its available, load it first while getting data from api. load in constructor
  async _getFromStore(success, fail){
    try {
      const value = await AsyncStorage.getItem(defaultKeys.ProgramsStore);
      if (value !== null) {
        // We have data!!
        alert('store items ==>' + value);
      }

    } catch (e) {
      fail(e)
    }
  }


}
