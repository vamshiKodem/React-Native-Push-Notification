import {
  Text,
  View,
  Button,
  NativeModules,
  NativeEventEmitter,
  AppState,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Screens} from '../models/screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {CalendarModule, VpnStatusModule} = NativeModules;
  const emitter = new NativeEventEmitter();
  const [vpnStatus, setVpnStatus] = useState(false);

  const onDetailsButtonPress = () => {
    navigation.navigate(Screens.DETAILS);
  };

  //  Invoking the function from js to native using callback
  // and passing data from the native to js
  const onPressClandarModule = () => {
    CalendarModule.createCalendarEvent('test', 'my location', (res: string) => {
      console.log(res);
    });
  };

  // invoking the function from js to native function using promise
  // and passing data from native to js
  const onPressCalandarModulePromise = async () => {
    try {
      const data = await CalendarModule.createCalendarEventPromise();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // add listner for the native events
  useEffect(() => {
    const countEmitter = emitter.addListener('EventCount', eventCount => {
      console.log(eventCount);
    });

    return () => {
      countEmitter.remove();
    };
  }, []);

  const getVpnStatus = useCallback(async () => {
    try {
      const status = await VpnStatusModule.isVpnConnected();
      setVpnStatus(status);
    } catch (e) {
      console.log('error something is not working', e);
    }
  }, []);

  useEffect(() => {
    getVpnStatus();
  }, [getVpnStatus]);

  useEffect(() => {
    const listner = AppState.addEventListener('change', async () => {
      await getVpnStatus();
    });

    return () => {
      listner.remove();
    };
  }, [getVpnStatus]);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to details screen" onPress={onDetailsButtonPress} />
      <Button title="Clandar Module" onPress={getVpnStatus} />
      <Text>{vpnStatus ? 'VPN is connected' : 'VPN is not connected'}</Text>
    </View>
  );
};
