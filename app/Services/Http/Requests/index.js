import axios from 'axios';
import HTTPMethods from './HTTPMethods';
import NetworkInfo from 'app/Services/Http/Requests/NetworkInfo';

const _NetworkInfo = new NetworkInfo();

export default class NetworkRequests {

  _get(endpoint, Method, success, fail){
    axios.get(endpoint)
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
        this._get(endpoint, Method,
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
