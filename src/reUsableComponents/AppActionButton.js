import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {style} from '../Screens/styles/HomeScreenStyles';

const AppActionButton = ({image, onpress}) => {
  return (
    <TouchableOpacity style={style.actionBtn} onPress={() => onpress()}>
      {image}
    </TouchableOpacity>
  );
};

export default AppActionButton;
