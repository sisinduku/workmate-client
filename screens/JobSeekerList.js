import React, { Component } from 'react';
import {Text, View, FlatList } from 'react-native';
import { List, ListItem, Card, Button } from 'react-native-elements';

export default class JobSeekerList extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <FlatList
        data={[
          {name: 'Job Seeker One', skills: 'Uhuy', 'compatibility': '90%'},
          {name: 'Job Seeker Two', skills: 'Ngahey', 'compatibility': '56%'}
        ]}
        keyExtractor={ (item, index) => index }
        renderItem={({ item}) => (
          <Card
              title={ item.name }
              image={{uri:'https://api.adorable.io/avatars/285/abott@adorable.png'}}
              imageStyle={{ alignSelf: 'center', width: 150, height: 150 }}
            >
            <View>
            <Text>{ item.skills }</Text>
            <Text>Compatibility: { item.compatibility }</Text>
            <Button
              style={{ marginTop: 16, marginBottom: 16 }}
              title='Details'
              onPress={() => navigate('JobSeekerProfile')}
            />
            </View>
          </Card>
        )}
      />
    );
  }
}