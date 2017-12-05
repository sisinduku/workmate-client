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
  BackAndroid,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import {
  Avatar,
  Card,
  Slider,
  Badge,
  FormInput,
  Icon,
} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import profileReduce from '../reducers/ProfileReduce'
import { getProfileAPI, editProfileAPI, addProfile } from '../actions/ProfileAction'

class JobSeekerOwnProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedName: false,
      editedEducation: false,
      editedSkills: false,
      editedLocation: false,
      editedSummary: false,
      isPersonalityTabOpen: false,
      isSummaryTabOpen: true,
      isInformationsTabOpen: false
    }
    // Set profile from AsyncStorage if any
    AsyncStorage.getItem('profile')
      .then(profile => {
        props.addProfile(JSON.parse(profile))
      })
  }

  _openTab(tab) {
    switch(tab) {
      case 'personality':
        this.setState({
          isPersonalityTabOpen: true,
          isSummaryTabOpen: false,
          isInformationsTabOpen: false
        });
        break;
      case 'summary':
        this.setState({
          isPersonalityTabOpen: false,
          isSummaryTabOpen: true,
          isInformationsTabOpen: false
        });
        break;
      case 'informations':
        this.setState({
          isPersonalityTabOpen: false,
          isSummaryTabOpen: false,
          isInformationsTabOpen: true
        });
      break;
    }
  }

  changeForm(e, key) {
    this.props.inputProfile[key] = e
    this.setState(this.props.inputProfile)
  }

  logout() {
    AsyncStorage.removeItem('profile')
    .then(value => {
      this.props.navigation.navigate('Home')
    })
    .catch(err => console.log(err))
  }
  render() {
    const skills = this.props.inputProfile.skills
    .map((skill, idx) => (
      <Badge
        key={ idx }
        value={skill}
        containerStyle={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          paddingTop: 8,
          paddingBottom: 8,
          marginBottom: 8
        }}
        textStyle={{ color: 'rgb(166,255,203)' }}
      />
    ));

    const educations = this.props.inputProfile.educations.map((education, idx) => (
      <Badge
        key={ idx }
        value={education}
        containerStyle={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          paddingTop: 8,
          paddingBottom: 8,
          marginBottom: 8,
          borderRadius: 200
        }}
        textStyle={{ 
          textAlign: 'center',
          color: 'rgb(166,255,203)'
        }}
      />
    ));

    const executive_summary = this.props.inputProfile.executive_summary.split('\n').map(sentence => sentence.replace('\n', ' '));

    const name = this.props.inputProfile.name.toUpperCase().split(' ');
    const firstname = name.splice(0, 1);
    const lastname = name.length > 0 ? name.join(' ') : '';

    return (
      <View style={ styles.container }>
        <View style={ styles.listWrapper }>
          <View style={ styles.imageWrapper }>
            <Image style={ styles.image } source={{uri: 'https://api.adorable.io/avatars/285/abott@adorable.png'}}/>
          </View>
          <View style={ styles.jobSeekerWrapper }>
            <Text style={{ fontSize: 12, letterSpacing: 1.1, fontWeight: 'bold', color: '#fafafa' }}>{ firstname } <Text style={{ color: 'rgb(166,255,203)' }}> {lastname}</Text></Text>
            <Text style={{ fontSize: 9, letterSpacing: 1.1, fontWeight: 'bold', color: 'rgb(18,216,250)' }}>{ this.props.inputProfile.location.toUpperCase() }</Text>
          </View>
        </View>

        <View style={ styles.tabWrapper }>
          <TouchableOpacity style={ this.state.isSummaryTabOpen ? styles.tabTextOpened : styles.tabText} onPress={() => {this._openTab('summary')}}>
            <Text style={ styles.tabText }>SUMMARY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ this.state.isInformationsTabOpen ? styles.tabTextOpened : styles.tabText} onPress={() => {this._openTab('informations')}}>
            <Text style={ styles.tabText }>INFORMATIONS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ this.state.isPersonalityTabOpen ? styles.tabTextOpened : styles.tabText } onPress={() => {this._openTab('personality')}}>
            <Text style={ styles.tabText }>LOG OUT</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={ this.state.isPersonalityTabOpen ? styles.personalityTabContainer : { display: 'none' } }>
          <View style={ styles.tabContainerChild }>
            <Card 
              containerStyle={ styles.tabContainerCards }
              dividerStyle={ styles.tabContainerCardsDivider }
            >
            <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: '#fafafa', borderRadius: 100, paddingTop: 12, paddingBottom: 12 }} onPress={() => {this.logout()}}>
              <Text style={{ color: '#fafafa', textAlign: 'center', fontSize: 16, letterSpacing: 1.2 }}>LOG OUT</Text>
            </TouchableOpacity>
            </Card>
          </View>
        </ScrollView>

        <ScrollView style={ this.state.isSummaryTabOpen ? styles.summaryTabContainer : { display: 'none' } }>
          <View style={ styles.tabContainerChild }>
            <Card 
              title='SUMMARY'
              titleStyle={ styles.tabContainerCardsTitle }
              containerStyle={ styles.tabContainerCards }
              dividerStyle={ styles.tabContainerCardsDivider }
            >
              {
                executive_summary.map((xs, idx) => (
                  <View key={idx}>
                    <Text style={{color: '#ffffff', justifyContent: 'center', textAlign: 'justify'}}>{ xs }</Text>
                    <Text>{'\n'}</Text>
                  </View>
                ))
              }
            </Card>
          </View>
        </ScrollView>

        <ScrollView style={ this.state.isInformationsTabOpen ? styles.informationsTabContainer : { display: 'none' } }>
          <View style={ styles.tabContainerChild }>
            <Card 
              title='SKILLS'
              titleStyle={ styles.tabContainerCardsTitle }
              containerStyle={ styles.tabContainerCards }
              dividerStyle={ styles.tabContainerCardsDivider }
            >
              { skills }
            </Card>

            <Card 
              title='EDUCATIONS'
              titleStyle={ styles.tabContainerCardsTitle }
              containerStyle={ styles.tabContainerCards }
              dividerStyle={ styles.tabContainerCardsDivider }
            >
              { educations }
            </Card>            
          </View>
        </ScrollView>
      </View>
    );
    // return (
    //   <KeyboardAwareScrollView
    //   enableOnAndroid={true}
    //   enableAutoAutomaticScroll={(Platform.OS === 'ios')}
    //   style={{ backgroundColor: '#4c69a5' }}
    //   resetScrollToCoords={{ x: 0, y: 0 }}
    //   contentContainerStyle={styles.container}
    //   scrollEnabled={true}
    // >
    //   <ScrollView style={styles.container}>
    //     <Card title={this.props.inputProfile.name}>
    //       <Avatar
    //         xlarge
    //         rounded
    //         source={{uri: "http://www.texasrevs.com/wp-content/uploads/2016/10/dummy-image.jpg"}}
    //         containerStyle={{alignSelf: 'center'}}
    //       />
    //     </Card>
    //     <Card title="Name">
    //       <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    //           <View>
    //             { this.state.editedName && (
    //               <FormInput
    //                 onChangeText={(e) => this.changeForm(e, 'name')}
    //                 value={this.props.inputProfile.name}
    //                 onBlur={() => {
    //                   this.props.updateProfile(this.props.inputProfile, this.props.id)
    //                   this.setState({editedName: false})
    //                 }}
    //               />)
    //             }
    //             { !this.state.editedName && (<Text>{this.props.inputProfile.name}</Text>) }
    //           </View>
    //           <Icon
    //             iconStyle={{color: '#ccc'}}
    //             name='edit'
    //             onPress={() => { this.setState({editedName: true})}}
    //           />
    //         </View>
    //       </Card>

    //       <Card title="Education">
    //         <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    //           <View>
    //             { this.state.editedEducation && (
    //               <FormInput
    //                 onChangeText={(e) => this.changeForm(e, 'education')}
    //                 value={this.props.inputProfile.education}
    //                 onBlur={() => {
    //                   this.props.updateProfile(this.props.inputProfile, this.props.id)
    //                   this.setState( {editedEducation: false} )
    //                 }}
    //               />)
    //             }
    //             { !this.state.editedEducation && (<Text>{this.props.inputProfile.educations}</Text>) }
    //           </View>
    //           <Icon
    //             name='edit'
    //             iconStyle={{color: '#ccc'}}
    //             onPress={() => { this.setState({editedEducation: true})}}
    //           />
    //         </View>
    //       </Card>

    //       <Card title="Skills">
    //         <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    //           <View>
    //             { this.state.editedSkills && (
    //               <FormInput
    //               onChangeText={(e) => this.changeForm(e, 'skills')}
    //               value={this.props.inputProfile.skills}
    //               onBlur={() => {
    //                 this.props.updateProfile(this.props.inputProfile, this.props.id)
    //                 this.setState( {editedSkills: false} )
    //               }}
    //               />)
    //             }
    //             { !this.state.editedSkills && (<Text>{this.props.inputProfile.skills}</Text>) }
    //           </View>
    //           <Icon
    //             name='edit'
    //             iconStyle={{color: '#ccc'}}
    //             onPress={() => { this.setState({editedSkills: true})}}
    //           />
    //         </View>
    //       </Card>

    //       <Card title="Location">
    //         <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    //           <View>
    //             { this.state.editedLocation && (
    //               <FormInput
    //               onChangeText={(e) => this.changeForm(e, 'location')}
    //               value={this.props.inputProfile.location}
    //               onBlur={() => {
    //                 this.props.updateProfile(this.props.inputProfile, this.props.id)
    //                 this.setState( {editedLocation: false} )
    //               }}
    //               />)
    //             }
    //             { !this.state.editedLocation && (<Text>{this.props.inputProfile.location}</Text>) }
    //           </View>
    //           <Icon
    //             iconStyle={{color: '#ccc'}}
    //             name='edit' onPress={() => { this.setState({editedLocation: true})}}
    //           />
    //         </View>
    //       </Card>

    //       <Card title="Executive Summary">
    //         <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    //           <View>
    //             { this.state.editedSummary && (
    //               <FormInput
    //                 value={this.props.inputProfile.executive_summary}
    //                 onBlur={() => {
    //                   this.props.updateProfile(this.props.inputProfile, this.props.id)
    //                   this.setState( {editedLocation: false} )
    //                 }}
    //               />)
    //             }
    //             { !this.state.editedSummary && (<Text>{this.props.inputProfile.executive_summary}</Text>) }
    //           </View>
    //           <Icon
    //             iconStyle={{color: '#ccc'}}
    //             name='edit' onPress={() => { this.setState({editedSummary: true})}}
    //           />
    //         </View>
    //       </Card>
    //       <Button onPress={() => this.logout()} title="LOGOUT" />
    //       <View style={{height:20}}/>
    //     </ScrollView>
    //   </KeyboardAwareScrollView>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
    paddingBottom: 24,
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)'
  },
  listWrapper: {
    flexDirection: 'row',
    marginTop: 16
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
    justifyContent: 'center'
  },
  tabWrapper: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(166,255,203, 0.2)'
  },
  tab: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16
  },
  tabText: {
    color: '#fafafa',
    fontSize: 12,
    textAlign: 'center'
  },
  personalityTabContainer: {
    display: 'flex',
    flex: 1,
  },
  summaryTabContainer: {
    display: 'flex',
    flex: 1,
  },
  informationsTabContainer: {
    display: 'flex',
    flex: 1,
  },
  tabContainerChild: {
    justifyContent: 'center'
  },
  tabContainerCards: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  tabContainerCardsTitle: {
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: '200'
  },
  tabContainerCardsDivider: {
    height: 0
  },
  traitTitle: {
    color: '#fafafa',
    letterSpacing: 1.6,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  traitScore: {
    color: 'rgb(166,255,203)'
  },
  sliderThumb: {
    width: 0,
    height: 0
  },
  sliderTrack: {
    height: 10
  }
});

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
