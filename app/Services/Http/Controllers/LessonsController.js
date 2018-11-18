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

export default class LessonsController {

  _getFromAPI(course_id, success, fail){
    const lesson_url = `${Config.api_base_url}${api.LESSONS}?course_uuid=${course_id}`;
    try {
      _NetworkRequests.request(lesson_url, HTTPMethods.GET, {},
        (response) => {
          // alert(JSON.stringify(response))
          return success(response.data.data);
        },
        (error) => {
          return fail(error)
        }
      );
    } catch (e) {
      return fail(e)
    }
  }
}
