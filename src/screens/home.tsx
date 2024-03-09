import {Text, View, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../models/screens';

export const Home = () => {
  const navigation = useNavigation();

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
