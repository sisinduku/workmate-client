import React, { Component } from 'react';
import { 
  View, 
  Form,
  Text,
  ScrollView, 
  TextInput, 
  Image, 
  Platform
} from 'react-native';
import { connect } from 'react-redux'
import { 
  FormLabel, 
  FormInput, 
  Button 
} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import profileReduce from '../reducers/ProfileReduce'
import { addProfile } from '../actions/ProfileAction'

import styles from './styles';

class CreateJobSeekerProfile extends Component {
  constructor (props) {
    super(props)
  }
  saveProfile(e, key) {
    this.props.inputProfile[key] = e
    this.setState(this.props.inputProfile)
  }
  render () {
    const { navigate } = this.props.navigation
    return (
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutoAutomaticScroll={(Platform.OS === 'ios')}
          style={{ backgroundColor: '#4c69a5' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
        >
          <ScrollView>
            {/* <Text>Name: {this.props.inputProfile.name}</Text>
            <Text>Location: {this.props.inputProfile.location}</Text>
            <Text>Education: {this.props.inputProfile.education}</Text>
            <Text>Skills: {this.props.inputProfile.skills}</Text>
            <Text>Summary: {this.props.inputProfile.summary}</Text> */}
            <FormLabel labelStyle={styles.label}>YOUR NAME</FormLabel>
            <FormInput onChangeText={(e) => this.saveProfile(e, 'name')} inputStyle={styles.input} />
            <FormLabel labelStyle={styles.label}>LOCATION</FormLabel>
            <FormInput onChangeText={(e) => this.saveProfile(e, 'location')} inputStyle={styles.input} />
            <FormLabel labelStyle={styles.label}>EDUCATION</FormLabel>
            <FormInput onChangeText={(e) => this.saveProfile(e, 'education')} inputStyle={styles.input} />
            <FormLabel labelStyle={styles.label}>SKILLS</FormLabel>
            <FormInput onChangeText={(e) => this.saveProfile(e, 'skills')} inputStyle={styles.input} />
            <FormLabel labelStyle={styles.label}>SUMMARY</FormLabel>
            <FormInput onChangeText={(e) => this.saveProfile(e, 'summary')} multiline={true} numberOfLines={1} inputStyle={styles.input} />
            <Button
              title='SUBMIT' 
              onPress={() => navigate('JobSeekerOwnProfile')}
              buttonStyle={styles.btn}
              icon={{name: 'send'}}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
    )
  }
}
const mapDispatch = (dispatch) => {
  return { 
    saveProfile: (input) => dispatch(addProfile(input))
  }
} 
const mapState = (state) => {
  return { inputProfile: state.ProfileReduce.inputProfile }
}
const profileConnect = connect(mapState, mapDispatch)(CreateJobSeekerProfile)
export default profileConnect