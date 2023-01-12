import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import FirstGuideScreen from '../Screens/FirstGuideScreen';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  let headerOption = {headerShown: false};
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={headerOption}
      />
      <Stack.Screen
        name="GuideScreen"
        component={FirstGuideScreen}
        options={headerOption}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={headerOption}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
