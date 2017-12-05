import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Slider, Divider, Card } from 'react-native-elements';

import Background from './components/Background';
import Logo from './../logo_transparent.png';


export default class Home extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={ styles.container }>
        <Background/>
        <Image
          style={{
            width: 164,
            height: 164,
            alignSelf: 'center',
            marginBottom: 64
          }}
          source={Logo}
        />
        <Button
          buttonStyle={ styles.button }
          title='CREATE PROFILE'
          color={'rgb(166,255,203)'}
          onPress={async () => {
            try {
              const profile = await AsyncStorage.getItem('profile')
              if (profile) {
                return navigate('JobSeekerOwnProfile')
              } else {
                return navigate('CreateJobSeekerProfile')
              }
            } catch (e) {
              console.error(e.message)
            }
          }}
        />
        <Button
          buttonStyle={ styles.button }
          title='SEARCH JOB SEEKER'
          color={'rgb(166,255,203)'}
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
    paddingTop: 24,
    paddingBottom: 24,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fafafa',
    borderRadius: 200,
    marginBottom: 16
  }
});
