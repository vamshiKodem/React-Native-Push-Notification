import React, {useEffect} from 'react';

import {StyleSheet, Text, View, Alert} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from './src/utils/notification';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
