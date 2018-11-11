import SInfo from 'react-native-sensitive-info';
import errorHandler from 'app/Utils/ErrorHandler';
import Config from 'LearnBaseApp/Config';
import HTTPMethods from 'app/Services/Http/Requests/HTTPMethods';
import NetworkRequests from 'app/Services/Http/Requests/';
import isValidEmail from 'app/Utils/EmailValidator';
import { defaultKeys } from 'app/Utils/DefaultKeys';
import api from 'app/Services/Http/Routes/api';
import LBDataStore from 'app/Services/Store';
import AuthController from 'app/Services/Http/Controllers/Auth/AuthController';

const login_url = `${Config.api_base_url}${api.LOGIN}`;
const register_url = `${Config.api_base_url}${api.REGISTER}`;
const networkRequests = new NetworkRequests();
const lbDataStore = new LBDataStore();
const Auth = new AuthController();

export default class LoginController {

  _signIn(email, password, success, fail){
    errors = [];
    //validate parameters
    //email => adewolegbemisola@gmail.com
    //password => user123
    if (email === '') {
      errors.push('Email field cannot be empty!');
    }
    if (!isValidEmail(email)){
      errors.push('Provided email is not valid');
    }
    if (password === '') {
      errors.push('password field cannot be empty!');
    }

    hasError = false;
    //process errors
    errorHandler(errors, function(message){
        fail({'validation_error': 'Invalid Input', 'message': message});
        hasError = true;
    });

    if(hasError) {
      return;
    }

    body = {
        email: email,
        password: password
    }

    Auth.authenticate(
      body,
      login_url,
      (response) => {
        success(response)
      },
      (response) => {
        fail(response)
      }
    );
    // networkRequests.request(login_url, HTTPMethods.POST, body,
    //   (response) => {
    //     if(response.data.status === 'error') {
    //       return fail(response.data);
    //     }
    //     lbDataStore._SecureDataStore(
    //       defaultKeys.access_token,
    //       response.data.data.access_token,
    //       (value)  => {
    //         success(true)}
    //     )
    //   },
    //   (error) => {return fail(error)}
    // );
  }


}
