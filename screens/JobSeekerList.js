import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { List, ListItem, Card, Button } from 'react-native-elements';

const mapStateToProps = (state) => ({
  searchResult: state.EmployerReducer.searchResult
});

class JobSeekerList extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        style={ styles.container }
        data={this.props.searchResult}
        keyExtractor={ (item, index) => item.jobSeeker._id }
        renderItem={({ item }) => (
          <TouchableOpacity style={ styles.listWrapper } onPress={() => navigate('JobSeekerProfile', { _id: item.jobSeeker._id }) }>
            <View style={ styles.imageWrapper }>
              <Image style={ styles.image } source={{uri: 'https://api.adorable.io/avatars/285/abott@adorable.png'}}/>
            </View>
            <View style={ styles.jobSeekerWrapper }>
              <Text style={{ fontSize: 10, letterSpacing: 1.1, fontWeight: 'bold', color: '#fafafa' }}>{ item.jobSeeker.name.toUpperCase() }</Text>
              <Text style={{ fontSize: 9, letterSpacing: 1.1, fontWeight: 'bold', color: '#cdcdcd' }}>{ item.jobSeeker.location }</Text>
            </View>
            <View style={ styles.compatibilityWrapper }>
            <Text style={{ fontSize: 6, fontWeight: 'bold', color: 'rgb(18,216,250)' }}>COMPATIBILITY</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgb(166,255,203)' }}>{Math.round(item.similarity * 100)}%</Text>
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

export default connect(mapStateToProps, null)(JobSeekerList);