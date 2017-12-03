import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Slider, Divider, Card } from 'react-native-elements';

import Background from './components/Background';
import Logo from './../logo.png';


export default class Home extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={ styles.container }>
        <Background/>
        <Image
          style={{
            width: 128,
            height: 128,
            alignSelf: 'center',
            marginBottom: 64
          }}
          source={Logo}
        />
        <Button
          buttonStyle={ styles.button }
          title='JOB SEEKER'
          onPress={() => navigate('CreateJobSeekerProfile')}
        />
        <Button
          buttonStyle={ styles.button }
          title='EMPLOYER'
          onPress={() => navigate('SearchJobSeekers')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fafafa',
    borderRadius: 200,
    marginBottom: 16
  }
});
