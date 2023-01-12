import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ThemeColors} from '../assets/Theme';
import {AppImages} from '../assets/Images/Images';
import * as Animatable from 'react-native-animatable';
import {StoreData} from '../assets/LocalStorage';

const FirstGuideScreen = ({navigation}) => {
  const [tapIndex, setTapIndex] = useState(0);
  const [data, setData] = useState([
    {
      id: 1,
      description: 'If you want to be friends with someone',
      title: 'Double-tap to',
      boldTitle: ' LIKE',
      image: AppImages.clickGuide,
    },
    {
      id: 2,
      description: "If you don't like someone",
      title: 'Swipe up to',
      boldTitle: ' PASS',
      image: AppImages.swipeGuide,
    },
  ]);

  const manageTap = async () => {
    setTapIndex(null);
    if (tapIndex === 1) {
      StoreData('FirstTimeOpen', '1');
      navigation.replace('HomeScreen');
    }
    setTimeout(() => {
      return setTapIndex(tapIndex + 1);
    }, 1);
  };

  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={1}
      onPress={() => manageTap()}>
      {tapIndex !== null ? (
        <Animatable.View
          style={style.detailViewContainer}
          animation={{from: {opacity: 0}, to: {opacity: 1}}}>
          <View>
            <Text style={style.description}>{data[tapIndex].description}</Text>
            <Text style={style.title}>
              {data[tapIndex].title}
              <Text style={{color: '#02C2D5'}}>{data[tapIndex].boldTitle}</Text>
            </Text>
          </View>
          <Image source={data[tapIndex].image} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: ThemeColors.white,
            }}>
            Double-tap to {'\n'}continue
          </Text>
        </Animatable.View>
      ) : null}
    </TouchableOpacity>
  );
};

export default FirstGuideScreen;

const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', backgroundColor: '#000000E6'},
  detailViewContainer: {
    height: 704,
    width: 280,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: ThemeColors.white,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    color: ThemeColors.white,
  },
});
