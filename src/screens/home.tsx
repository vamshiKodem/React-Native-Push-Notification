import {Text, View, Button} from 'react-native';
import React from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Screens} from '../models/screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View>
      <Text>Home Screen</Text>

      <Button
        title="Go to details screen"
        onPress={() => navigation.navigate(Screens.DETAILS)}
      />
    </View>
  );
};
