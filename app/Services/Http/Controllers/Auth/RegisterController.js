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

const register_url = `${Config.api_base_url}${api.REGISTER}`;
const networkRequests = new NetworkRequests();
const lbDataStore = new LBDataStore();
const Auth = new AuthController();

export default class RegisterController {

  _signUp(payload, success, fail){
    email = payload.email;
    password = payload.password;
    first_name = payload.first_name;
    last_name = payload.last_name;
    phone = payload.phone;
    password_confirmation = payload.password_confirmation;

    errors = [];
    //validate parameters
    //email => adewolegbemisola@gmail.com
    //password => user123

    if (first_name === '') {
      errors.push('First name field cannot be empty!');
    }
    if (last_name === '') {
      errors.push('Last name field cannot be empty!');
    }
    if (email === '') {
      errors.push('Email field cannot be empty!');
    }
    if (!isValidEmail(email)){
      errors.push('Provided email is not valid');
    }
    if (password === '') {
      errors.push('password field cannot be empty!');
    }
    if (password_confirmation === '') {
      errors.push('password confirmation field cannot be empty!');
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

    Auth.authenticate(
      payload,
      register_url,
      (response) => {
        success(response)
      },
      (response) => {
        fail(response)
      }
    );
  }


}
