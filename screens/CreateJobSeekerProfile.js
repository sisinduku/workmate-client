import React, { Component } from 'react';
import { 
  View, 
  ScrollView, 
  TextInput, 
  Image, 
  Platform 
} from 'react-native';
import { 
  FormLabel, 
  FormInput, 
  Button 
} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';

class CreateJobSeekerProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      education: '',
      skills: '',
      executiveSummary: '',
      personalityInsight: ''
    }
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
          <FormLabel>Name</FormLabel>
          <FormInput />
          <FormLabel style={styles.input}>Location</FormLabel>
          <FormInput />
          <FormLabel>Education</FormLabel>
          <FormInput />
          <FormLabel>Skills</FormLabel>
          <FormInput />
          <FormLabel>Executive Summary</FormLabel>
          <FormInput multiline={true} numberOfLines={1} />
          <FormLabel>Personality Insight</FormLabel>
          <FormInput />
          <Button style={styles.btn} title="Submit" onPress={() => navigate('JobSeekerProfile')} />
          </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

export default CreateJobSeekerProfile;