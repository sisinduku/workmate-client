import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Card } from 'react-native-elements';

export default class JobSeekerProfile extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Card
            title='Job Seeker'
            image={{uri:'https://api.adorable.io/avatars/285/abott@adorable.png'}}
            imageStyle={{ alignSelf: 'center', width: 150, height: 150 }}
          >
          <View>
            <Text>Jakarta, ID</Text>
          </View>
        </Card>
        <Card title='Summary'>
          <Text>Executive Summary</Text>
        </Card>
        <Card title='Personality'>
          <Text>Personality Insight</Text>
        </Card>
        <Card title='Skills'>
          <Text>Skills</Text>
        </Card>
        <Card title='Educations'>
          <Text>SDN Merdeka Jelek</Text>
        </Card>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});