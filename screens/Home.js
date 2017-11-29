import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Slider, Divider, Card } from 'react-native-elements';

export default class Home extends Component {
  render() {
    const { navigate } = this.props.navigation; 
    return (
      <View style={styles.container}>
        <Button
          large
          style={{ marginBottom: 16 }}
          title='JOB SEEKER'
          onPress={() => navigate('CreateJobSeekerProfile')}
        />
        <Button
          large
          style={{ marginBottom: 16 }}
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
});
