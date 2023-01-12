import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {ThemeColors} from '../assets/Theme';

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: 'black',
          marginBottom: '2%',
        }}>
        Please wait...
      </Text>
      <ActivityIndicator color={ThemeColors.black} size="large" />
    </View>
  );
};

export default Loader;
