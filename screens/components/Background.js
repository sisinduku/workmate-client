import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

import BackgroundImage from './../../bg.jpg';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Background = () => (
  <View
    style={{
      flex: 1,
      position: 'absolute',
      width: deviceWidth,
      height: deviceHeight,
      justifyContent: 'center',
    }}
  >
    <Image
      style={{
        backgroundColor: '#ccc',
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: deviceWidth,
        height: deviceHeight,
        justifyContent: 'center',
      }}
      source={BackgroundImage}
    />
    <LinearGradient
      // alternatives (blue) colors={['rgba(31,162,255,0.9)', 'rgba(18,216,250,0.9)', 'rgb(166,255,203,0.9)']}
      // colors={['rgba(255,88,88,0.99)', 'rgba(248,87,166,0.85)']}
      // colors={['rgba(31,162,255,0.88)', 'rgba(18,216,250,0.95)', 'rgba(166,255,203,0.98)']}
      colors={['rgba(0, 0, 0, 0.85)', 'rgba(0, 0, 0, 0.89)', 'rgba(0, 0, 0, 0.94)', 'rgba(0,0,0,0.99)']}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: deviceHeight
      }}
    />
  </View>
);

export default Background;