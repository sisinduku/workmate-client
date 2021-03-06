import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { List, ListItem, Card, Button } from 'react-native-elements';

import Loading from './Loading';

const mapStateToProps = (state) => ({
  searchResult: state.EmployerReducer.searchResult
});

class JobSeekerList extends Component {
  render() {
    const { navigate } = this.props.navigation;

    const searchResults = () => (
      <View style={{flex: 1, backgroundColor: 'rgb(0, 0, 0)'}}>
      <FlatList
        style={ styles.container }
        data={this.props.searchResult}
        keyExtractor={ (item, index) => item.jobSeeker._id }
        renderItem={({ item }) => (
          <TouchableOpacity style={ styles.listWrapper } onPress={() => navigate('JobSeekerProfile', { _id: item.jobSeeker._id }) }>
            <View style={ styles.imageWrapper }>
              <Image style={ styles.image } source={{ uri: item.avatarURI }}/>
            </View>
            <View style={ styles.jobSeekerWrapper }>
              <Text style={{ fontSize: 12, letterSpacing: 1.1, fontWeight: 'bold', color: '#fafafa' }}>{ item.jobSeeker.name.toUpperCase() }</Text>
              <Text style={{ fontSize: 9, letterSpacing: 1.1, fontWeight: 'bold', color: 'rgb(18,216,250)' }}>{ item.jobSeeker.location.toUpperCase() }</Text>
            </View>
            <View style={ styles.compatibilityWrapper }>
            <Text style={{ fontSize: 6, fontWeight: 'bold', color: 'rgb(18,216,250)' }}>COMPATIBILITY</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgb(166,255,203)' }}>{Math.round(item.similarity * 100)}%</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </View>
    );

    return this.props.searchResult ? searchResults()  : <Loading/>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingLeft: 24, 
    paddingRight: 24,
    marginTop: 24,
    marginBottom: 24,
    flex: 1
  },
  listWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 500,
    marginTop: 16
  },
  imageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden'
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

export default connect(mapStateToProps, null)(JobSeekerList);