import React, {useEffect} from 'react';

import {Alert} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from './src/utils/notification';
import {MyStackNavigation} from './src/routes/myStackNavigation';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title ?? '',
        remoteMessage.notification?.body,
      );
    });

    return unsubscribe;
  }, []);

  return <MyStackNavigation />;
};

export default App;
