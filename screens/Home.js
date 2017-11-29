import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Home extends Component {
  render() {
    const { navigate } = this.props.navigation; 
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <TouchableOpacity onPress={() => navigate('CreateJobSeekerProfile')}>
          <Text>Job Seeker</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('SearchJobSeekers')}>
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
