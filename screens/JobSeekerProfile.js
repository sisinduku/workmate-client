import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Card, Slider, Badge } from 'react-native-elements';

export default class JobSeekerProfile extends Component {
  constructor() {
    super();
    this.state = {
      isPersonalityTabOpen: true,
      isSummaryTabOpen: false,
      isInformationsTabOpen: false
    };
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

  render() {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    const skills = [
    'ReactJS',
    'NodeJS',
    'MongoDB',
    'Git',
    'Jest']
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
    const educations = [
      'SD Negeri Banjarsari I',
      'SMP Negeri 5 Bandung',
      'SMA Negeri 3 Bandung',
      'Departemen Arkeologi, Universitas Indonesia'
    ]
    .map((education, idx) => (
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
    ))
    const traits = [
    {type: 'openness', score: 88},
    {type: 'extraversion', score: 99},
    {type: 'agreeableness', score: 5},
    {type: 'conscientiousness', score: 1},
    {type: 'curiousity', score: 30},
    {type: 'ideal', score: 76},
    {type: 'challenge', score: 30},
    {type: 'practicality', score: 14},
    {type: 'stimulation', score: 42},
    {type: 'helping others', score: 12},
    {type: 'tradition', score: 44},
    {type: 'achievement', score: 68}
    ]
    .map((trait, idx) => (
      <View key={ idx }>
        <Text style={ styles.traitTitle }>
          {`${trait.type.toUpperCase()}: `}
          <Text style={ styles.traitScore }>
          {
            String(trait.score).length === 1 ? `  ${String(trait.score)}%` 
            : String(trait.score).length === 2 ? ` ${String(trait.score)}%`
            : `${String(trait.score)}%`
          }
          </Text>
        </Text>
        <Slider 
          style={{flex: 1}}
          value={ trait.score }
          disabled={ true }
          minimumValue={0}
          maximumValue={100}
          trackStyle={ styles.sliderTrack }
          thumbStyle={ styles.sliderThumb }
          step={1}
          minimumTrackTintColor={'rgb(166,255,203)'}
          maximumTrackTintColor={'rgba(255,255,255, 0)'}
          thumbTintColor={'rgb(255, 255, 255)'}
        />
      </View>
    ));

    return (
      <View style={ styles.container }>
        <View style={ styles.listWrapper }>
          <View style={ styles.imageWrapper }>
            <Image style={ styles.image } source={{uri: 'https://api.adorable.io/avatars/285/abott@adorable.png'}}/>
          </View>
          <View style={ styles.jobSeekerWrapper }>
            <Text style={{ fontSize: 10, letterSpacing: 1.1, fontWeight: 'bold', color: '#fafafa' }}>JOBSEEKER NAME</Text>
            <Text style={{ fontSize: 7, letterSpacing: 1.1, fontWeight: 'bold', color: '#cdcdcd' }}>JAKARTA, ID</Text>
          </View>
        </View>

        <View style={ styles.tabWrapper }>
          <TouchableOpacity style={ styles.tab } onPress={() => {this._openTab('personality')}}>
            <Text style={ styles.tabText }>PERSONALITY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.tab } onPress={() => {this._openTab('summary')}}>
            <Text style={ styles.tabText }>SUMMARY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.tab } onPress={() => {this._openTab('informations')}}>
            <Text style={ styles.tabText }>INFORMATIONS</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={ this.state.isPersonalityTabOpen ? styles.personalityTabContainer : { display: 'none' } }>
          <View style={ styles.tabContainerChild }>
            <Card 
              title='PERSONALITY'
              titleStyle={ styles.tabContainerCardsTitle }
              containerStyle={ styles.tabContainerCards }
              dividerStyle={ styles.tabContainerCardsDivider }
            >
            { traits }
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
              <Text style={{color: '#fafafa'}}>SUMMARY</Text>
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
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
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
    borderBottomColor: '#fafafa'
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