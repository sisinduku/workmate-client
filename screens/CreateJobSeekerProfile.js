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
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import {
  FormLabel,
  FormInput,
  Button,
  Card
} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import profileReduce from '../reducers/ProfileReduce'
import { addProfileAPI, setStatusForm, resetProcess, getProfileAPI } from '../actions/ProfileAction'

class CreateJobSeekerProfile extends Component {
  constructor (props) {
    super(props)
    props.resetProcess()
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.isDone) {
      this.props.resetProcess()
      this.props.navigation.navigate('JobSeekerOwnProfile')
    }
  }
  save(input) {
    if(!this.props.process) {
      this.props.navigation.navigate('Loading')
    }
    this.props.saveProfile(input)
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
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={{flex: 1, padding: 24, backgroundColor: '#000'}}
      >
      <ScrollView>
        <Text style={{ color:'#fafafa', textAlign: 'center', marginTop: 24, marginBottom: 24, fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5 }}>CREATE PROFILE</Text>
        <FormLabel labelStyle={styles.label}>NAME</FormLabel>
        <FormInput onChangeText={(e) => this.changeProfile(e, 'name')} inputStyle={styles.input} containerStyle={ styles.inputContainer }/>

        <FormLabel labelStyle={styles.label}>LOCATION</FormLabel>
        <FormInput onChangeText={(e) => this.changeProfile(e, 'location')} inputStyle={styles.input} containerStyle={ styles.inputContainer }/>

        <FormLabel labelStyle={styles.label}>EDUCATIONS</FormLabel>
        <FormInput onChangeText={(e) => this.changeProfile(e, 'education')} inputStyle={styles.input} containerStyle={ styles.inputContainer }/>

        <FormLabel labelStyle={styles.label}>SKILLS</FormLabel>
        <FormInput onChangeText={(e) => this.changeProfile(e, 'skills')} inputStyle={styles.input} containerStyle={ styles.inputContainer }/>

        <FormLabel labelStyle={styles.label}>SUMMARY</FormLabel>
        <FormInput onChangeText={(e) => this.changeProfile(e, 'executive_summary')} multiline={true} numberOfLines={1} inputStyle={styles.input} containerStyle={ styles.inputContainer }/>
        
        <Button title='CREATE PROFILE' color={'rgb(166,255,203)'} onPress={() => { this.props.status && this.save(this.props.inputProfile)}} buttonStyle={styles.btn}/>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;

const styles = {
  inputContainer: {
    overflow: 'hidden'
  },
  input: {
    width: deviceWidth - 120,
    maxHeight: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    color: 'rgb(166,255,203)',
    fontSize: 16,
    padding: 4,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
  },
  btn: {
    backgroundColor: 'transparent',
    borderRadius: 200,
    borderWidth: 1,
    borderColor: '#fafafa',
    marginTop: 32
  },
  label: {
    fontSize: 10,
    letterSpacing: 1.1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  titleCard: {
    color: 'rgb(255, 255, 255)',
    letterSpacing: 2,
    fontWeight: '200'
  },
}


const mapDispatch = (dispatch) => {
  return {
    saveProfile: (input) => dispatch(addProfileAPI(input)),
    setSubmit: (status) => dispatch(setStatusForm(status)),
    resetProcess: () => dispatch(resetProcess())
  }
}


const mapState = (state) => {
  return {
    status: state.ProfileReduce.statusForm,
    process: state.ProfileReduce.process,
    inputProfile: state.ProfileReduce.inputProfile,
    message: state.ProfileReduce.message,
    isDone: state.ProfileReduce.isDone,
  }
}
const profileConnect = connect(mapState, mapDispatch)(CreateJobSeekerProfile)
export default profileConnect
