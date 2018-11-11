import { NetInfo } from 'react-native';
import Toast from 'react-native-simple-toast';

const offlineNetworkMsg = 'Network connection has gone offline. Turn on internet connection or connect to WiFi.';
export default class  NetworkInfo {

  _handleFirstConnectivityChange(isConnected) {
    if (!isConnected) {
        Toast.show(offlineNetworkMsg);
    } else {
      Toast.show('Online');
    }
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleFirstConnectivityChange
    );
  }

  _getInternetStatus(){
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
          Toast.show(offlineNetworkMsg);
      }
    });

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleFirstConnectivityChange
    );
  }
}
