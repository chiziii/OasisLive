import { Alert } from 'react-native';

export default class LBAlert{
    dismiss(title: String, message: String){
      Alert.alert(
        title,
        message,
        [
          {text: 'Dismiss'},
        ],
        { cancelable: false }
      )
    }

    confirm(title: String, message: String, cancelable: Boolean = false, perform, cancel){
      Alert.alert(
        title,
        message,
        [
          {text: 'Cancel', onPress: () => cancel(), style: 'cancel'},
          {text: 'OK', onPress: () => perform()},
        ],
        { cancelable: cancelable }
      )
    }
    
    customAction(title: String, message: String, cancelable: Boolean, actions: Array){
      Alert.alert(
        title,
        message,
        actions,
        { cancelable: cancelable }
      )
    }
  }
