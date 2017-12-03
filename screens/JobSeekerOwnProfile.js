import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  AsyncStorage,
  Button,
  BackAndroid
} from 'react-native';
import { connect } from 'react-redux'
import {
  Avatar,
  Card,
  FormInput,
  Icon,
} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import profileReduce from '../reducers/ProfileReduce'
import { getProfileAPI, editProfileAPI, addProfile } from '../actions/ProfileAction'

import styles from './styles.js'

class JobSeekerOwnProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedName: false,
      editedEducation: false,
      editedSkills: false,
      editedLocation: false,
      editedSummary: false,
    }
    // Set profile from AsyncStorage if any
    AsyncStorage.getItem('profile')
      .then(profile => {
        props.addProfile(JSON.parse(profile))
        console.log('============== load data from async');
      })
  }
  changeForm(e, key) {
    this.props.inputProfile[key] = e
    this.setState(this.props.inputProfile)
  }
  // componentWillMount() {
  //   BackAndroid.addEventListener('hardwareButtonPress', () => 
  //     this.props.navigation.navigate('Home')
  //   ) 
  // }
  logout() {
    AsyncStorage.removeItem('profile')
    .then(value => {
      this.props.navigation.navigate('Home')
      console.log(value)
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutoAutomaticScroll={(Platform.OS === 'ios')}
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
      <ScrollView style={styles.container}>
        <Card title={this.props.inputProfile.name}>
          <Avatar
            xlarge
            rounded
            source={{uri: "http://www.texasrevs.com/wp-content/uploads/2016/10/dummy-image.jpg"}}
            containerStyle={{alignSelf: 'center'}}
          />
        </Card>
        <Card title="Name">
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                { this.state.editedName && (
                  <FormInput
                    onChangeText={(e) => this.changeForm(e, 'name')}
                    value={this.props.inputProfile.name}
                    onBlur={() => {
                      this.props.updateProfile(this.props.inputProfile, this.props.id)
                      this.setState({editedName: false})
                    }}
                  />)
                }
                { !this.state.editedName && (<Text>{this.props.inputProfile.name}</Text>) }
              </View>
              <Icon
                iconStyle={{color: '#ccc'}}
                name='edit'
                onPress={() => { this.setState({editedName: true})}}
              />
            </View>
          </Card>

          <Card title="Education">
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                { this.state.editedEducation && (
                  <FormInput
                    onChangeText={(e) => this.changeForm(e, 'education')}
                    value={this.props.inputProfile.education}
                    onBlur={() => {
                      this.props.updateProfile(this.props.inputProfile, this.props.id)
                      this.setState( {editedEducation: false} )
                    }}
                  />)
                }
                { !this.state.editedEducation && (<Text>{this.props.inputProfile.educations}</Text>) }
              </View>
              <Icon
                name='edit'
                iconStyle={{color: '#ccc'}}
                onPress={() => { this.setState({editedEducation: true})}}
              />
            </View>
          </Card>

          <Card title="Skills">
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                { this.state.editedSkills && (
                  <FormInput
                  onChangeText={(e) => this.changeForm(e, 'skills')}
                  value={this.props.inputProfile.skills}
                  onBlur={() => {
                    this.props.updateProfile(this.props.inputProfile, this.props.id)
                    this.setState( {editedSkills: false} )
                  }}
                  />)
                }
                { !this.state.editedSkills && (<Text>{this.props.inputProfile.skills}</Text>) }
              </View>
              <Icon
                name='edit'
                iconStyle={{color: '#ccc'}}
                onPress={() => { this.setState({editedSkills: true})}}
              />
            </View>
          </Card>

          <Card title="Location">
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                { this.state.editedLocation && (
                  <FormInput
                  onChangeText={(e) => this.changeForm(e, 'location')}
                  value={this.props.inputProfile.location}
                  onBlur={() => {
                    this.props.updateProfile(this.props.inputProfile, this.props.id)
                    this.setState( {editedLocation: false} )
                  }}
                  />)
                }
                { !this.state.editedLocation && (<Text>{this.props.inputProfile.location}</Text>) }
              </View>
              <Icon
                iconStyle={{color: '#ccc'}}
                name='edit' onPress={() => { this.setState({editedLocation: true})}}
              />
            </View>
          </Card>

          <Card title="Executive Summary">
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                { this.state.editedSummary && (
                  <FormInput
                    value={this.props.inputProfile.executive_summary}
                    onBlur={() => {
                      this.props.updateProfile(this.props.inputProfile, this.props.id)
                      this.setState( {editedLocation: false} )
                    }}
                  />)
                }
                { !this.state.editedSummary && (<Text>{this.props.inputProfile.executive_summary}</Text>) }
              </View>
              <Icon
                iconStyle={{color: '#ccc'}}
                name='edit' onPress={() => { this.setState({editedSummary: true})}}
              />
            </View>
          </Card>
          <Button onPress={() => this.logout()} title="LOGOUT" />
          <View style={{height:20}}/>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    updateProfile: (input, id) => dispatch(editProfileAPI(input, id)),
    getProfile: (id) => dispatch(getProfileAPI(id)),
    addProfile: (profile) => dispatch(addProfile(profile))
  }
}
const mapState = (state) => {
  return { inputProfile: state.ProfileReduce.inputProfile, id: state.ProfileReduce.id }
}
const profileConnect = connect(mapState, mapDispatch)(JobSeekerOwnProfile)
export default profileConnect
