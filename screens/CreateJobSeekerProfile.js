import React, { Component } from 'react';
import { 
  View, 
  Form,
  Text,
  ScrollView, 
  TextInput, 
  Image, 
  Platform,
  Dimensions,
  Modal,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import { 
  FormLabel, 
  FormInput, 
  Button
} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import profileReduce from '../reducers/ProfileReduce'
import { addProfileAPI, setStatusForm, resetProcess, getProfileAPI } from '../actions/ProfileAction'

import styles from './styles';

class CreateJobSeekerProfile extends Component {
  constructor (props) {
    super(props)
    props.resetProcess()
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.process)
    this.props.navigation.navigate('JobSeekerOwnProfile') 
    if(nextProps.id != '')
    this.props.navigation.navigate('JobSeekerOwnProfile')          
  }
  save(input) {
    this.props.saveProfile(input)
    if(!this.props.process) {
      this.props.navigation.navigate('Loading')                  
    }
  }
  changeProfile(e, key) {
    if(key == 'education') {
      this.props.inputProfile.educations = e.split(',')
    }
    else if(key == 'skills') {
      this.props.inputProfile.skills = e.split(',')      
    }
    else {
      this.props.inputProfile[key] = e      
    }
    this.setState(this.props.inputProfile)
    if(
      this.props.inputProfile.name != '' && 
      this.props.inputProfile.location != '' &&
      this.props.inputProfile.education != '' &&
      this.props.inputProfile.executive_summary != '' &&
      this.props.inputProfile.skills != ''
    ) this.props.setSubmit(true)
  }
  render () {
    const { navigate } = this.props.navigation
    console.log(this.props.process)
    if(this.props.id == undefined) {
      return (
        this.props.getProfile('5a239e11dc7bb04fd3b05b4d')      
        !this.props.process && (this.props.navigation.navigate('Loading'))                  
      )
    } else {
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
              <FormLabel labelStyle={styles.label}>YOUR NAME</FormLabel>
              <FormInput onChangeText={(e) => this.changeProfile(e, 'name')} inputStyle={styles.input} />
              <FormLabel labelStyle={styles.label}>LOCATION</FormLabel>
              <FormInput onChangeText={(e) => this.changeProfile(e, 'location')} inputStyle={styles.input} />
              <FormLabel labelStyle={styles.label}>EDUCATIONS</FormLabel>
              <FormInput onChangeText={(e) => this.changeProfile(e, 'education')} inputStyle={styles.input} />
              <FormLabel labelStyle={styles.label}>SKILLS</FormLabel>
              <FormInput onChangeText={(e) => this.changeProfile(e, 'skills')} inputStyle={styles.input} />
              <FormLabel labelStyle={styles.label}>SUMMARY</FormLabel>
              <FormInput onChangeText={(e) => this.changeProfile(e, 'executive_summary')} multiline={true} numberOfLines={1} inputStyle={styles.input} />
              <Button
                title='SUBMIT' 
                onPress={() => { this.props.status && this.save(this.props.inputProfile)}}
                buttonStyle={styles.btn}
                icon={{name: 'send'}}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
      )
    }
  }
}
const mapDispatch = (dispatch) => {
  return { 
    saveProfile: (input) => dispatch(addProfileAPI(input)),
    setSubmit: (status) => dispatch(setStatusForm(status)),
    resetProcess: () => dispatch(resetProcess()),
    getProfile: (id) => dispatch(getProfileAPI(id))
  }
} 
const mapState = (state) => {
  return { 
    status: state.ProfileReduce.statusForm,
    process: state.ProfileReduce.process,
    inputProfile: state.ProfileReduce.inputProfile, 
    message: state.ProfileReduce.message 
  }
}
const profileConnect = connect(mapState, mapDispatch)(CreateJobSeekerProfile)
export default profileConnect