import {
  Text,
  View,
  Button,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import React, {useEffect} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Screens} from '../models/screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {CalendarModule} = NativeModules;
  const emitter = new NativeEventEmitter();

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

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to details screen" onPress={onDetailsButtonPress} />
      <Button title="Clandar Module" onPress={onPressCalandarModulePromise} />
    </View>
  );
};
