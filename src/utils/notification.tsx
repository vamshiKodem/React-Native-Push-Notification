import messaging from '@react-native-firebase/messaging';
// eslint-disable-next-line react-native/split-platform-components
import {PermissionsAndroid, Platform} from 'react-native';

export async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('i am here');
      getFCMToken();
    } else {
      console.log('error in permission');
    }
  } else {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFCMToken();
    }
  }
}

const getFCMToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const newToken = await messaging().getToken();
    console.log(newToken);
  } catch (error) {
    console.log('error during generating token', error);
  }
};
