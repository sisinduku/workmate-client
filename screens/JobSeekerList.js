import React, { Component } from 'react';
import {Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { List, ListItem, Card, Button } from 'react-native-elements';

export default class JobSeekerList extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <FlatList
        style={ styles.container }
        data={[
          {name: 'Job Seeker One', skills: 'Uhuy', 'compatibility': '90%'},
          {name: 'Job Seeker Two', skills: 'Ngahey', 'compatibility': '56%'}
        ]}
        keyExtractor={ (item, index) => index }
        renderItem={({ item}) => (
          <TouchableOpacity style={ styles.listWrapper } onPress={() => navigate('JobSeekerProfile') }>
            <View style={ styles.imageWrapper }>
              <Image style={ styles.image } source={{uri: 'https://api.adorable.io/avatars/285/abott@adorable.png'}}/>
            </View>
            <View style={ styles.jobSeekerWrapper }>
              <Text style={{ fontSize: 10, letterSpacing: 1.1, fontWeight: 'bold', color: '#fafafa' }}>{ item.name.toUpperCase() }</Text>
              <Text style={{ fontSize: 7, letterSpacing: 1.1, fontWeight: 'bold', color: '#cdcdcd' }}>JAKARTA, ID</Text>
            </View>
            <View style={ styles.compatibilityWrapper }>
            <Text style={{ fontSize: 6, fontWeight: 'bold', color: 'rgb(18,216,250)' }}>COMPATIBILITY</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgb(166,255,203)' }}>{item.compatibility}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(0, 0, 0)',
    paddingLeft: 24,
    paddingRight: 24,
    flex: 1
  },
  listWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 300,
    marginTop: 16,
  },
  imageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  image: {
    width: 64,
    height: 64
  },
  jobSeekerWrapper: {
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
    justifyContent: 'center'
  },
  compatibilityWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center'
  }
});