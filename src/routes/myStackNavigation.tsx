import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import {Home} from '../screens/home';
import {Details} from '../screens/details';
import {Profile} from '../screens/profile';
import {Screens} from '../models/screens';

const NAVIGATION_IDS = [Screens.HOME, Screens.DETAILS, Screens.PROFILE];

export const MyStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  const buildDeepLinkFromNotificationData = (data: any): string | null => {
    const navigationId = data?.navigationId;
    if (!NAVIGATION_IDS.includes(navigationId)) {
      console.warn('Unverified navigationId', navigationId);
      return null;
    }
    if (navigationId === 'home') {
      return `myapp://${Screens.HOME}`;
    }
    if (navigationId === 'details') {
      return `myapp://${Screens.DETAILS}`;
    }
    if (navigationId === 'profile') {
      return `myapp://${Screens.PROFILE}`;
    }

    console.warn('missing navigationId', navigationId);
    return null;
  };

  const linking = {
    prefixes: ['myapp://'],
    config: {
      initialRouteName: Screens.HOME,
      screens: {
        home: Screens.HOME,
        details: Screens.DETAILS,
        profile: Screens.PROFILE,
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (typeof url === 'string') {
        return url;
      }
      //getInitialNotification: When the application is opened from a quit state.
      const message = await messaging().getInitialNotification();
      const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
      if (typeof deeplinkURL === 'string') {
        return deeplinkURL;
      }
    },
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({url}: {url: string}) => listener(url);

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

      //onNotificationOpenedApp: When the application is running, but in the background.
      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (typeof url === 'string') {
          listener(url);
        }
      });

      return () => {
        linkingSubscription.remove();
        unsubscribe();
      };
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator animating />}>
      <Stack.Navigator initialRouteName={Screens.HOME}>
        <Stack.Screen name={Screens.HOME} component={Home} />
        <Stack.Screen name={Screens.DETAILS} component={Details} />
        <Stack.Screen name={Screens.PROFILE} component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
