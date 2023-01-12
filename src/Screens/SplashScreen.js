import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ThemeColors} from '../assets/Theme';
import {getAsyncValue} from '../assets/LocalStorage';
import {homeScreen} from '../assets/Lables';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    getApplicationStatus();
  }, []);

  const getApplicationStatus = async () => {
    let status = await getAsyncValue('FirstTimeOpen');

    if (status) {
      return navigation.replace('HomeScreen');
    }

    return navigation.replace('GuideScreen');
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>{homeScreen.welcome}</Text>
    </View>
  );
};

export default SplashScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {color: ThemeColors.black, fontSize: 25, fontWeight: '800'},
});
