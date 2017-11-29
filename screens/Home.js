import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>WORKMATE</Text>
        <Text>Home Screen</Text>
        <TouchableOpacity onPress={() => alert('Job Seeker Button Pressed')}>
          <Text>Job Seeker</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Employer Button Pressed')}>
          <Text>Employer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
