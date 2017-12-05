import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity} from 'react-native';
import { Card, Slider, Badge, Button } from 'react-native-elements';
import axios from 'axios';

const mapStateToProps = (state) => ({
  searchResult: state.EmployerReducer.searchResult,
  searchedCriteria: state.EmployerReducer.searchedCriteria
});

class JobSeekerProfile extends Component {
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

  _sendEmail(name, email) {
    const URL = '/send_email';
    const body = {
      receiver_name: name,
      receiver_email: email
    }

    console.log(body);
    alert(`Invitation sent to\n${name}!`);
    // axios.post(URL, {})
    // .then(resp => {
    //   alert('Invitation Sent!');
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  render() {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    const jobSeeker = this.props.searchResult.find(item => item.jobSeeker._id == this.props.navigation.state.params._id);

    const executive_summary = jobSeeker.jobSeeker.executive_summary.split('\n\n').map(sentence => sentence.replace('\n', ' '));

    const skills = jobSeeker.jobSeeker.skills.map((skill, idx) => (
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

    const educations = jobSeeker.jobSeeker.educations.map((education, idx) => (
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

    const insight = JSON.parse(jobSeeker.jobSeeker.personality_insight);

    const name = jobSeeker.jobSeeker.name.toUpperCase().split(' ');
    const firstname = name.splice(0, 1);
    const lastname = name.length > 0 ? name.join(' ') : '';

    const personalities = insight.personality;
    const needs = insight.needs;
    const values = insight.values;

    const mainTraits = personalities.concat(needs).concat(values).map(p => ({
      trait_id: p.trait_id,
      name: p.name,
      score: Math.ceil(p.percentile * 100)
    }));

    const childTraits = personalities.concat(needs).concat(values).reduce((ct, p) => {
      if (p.children && p.children.length > 0) {
        const pcTraits = p.children.map(pc => ({
          trait_id: pc.trait_id,
          name: pc.name,
          score: Math.ceil(pc.percentile * 100)
        }));

        ct = ct.concat(pcTraits);
      }

      return ct;
    }, []);

    const dt = [     
      'big5_openness',
      'big5_extraversion',
      'big5_agreeableness',
      'big5_conscientiousness',
      'need_curiosity',
      'need_ideal',
      'need_challenge',
      'need_practicality',
      'value_openness_to_change',
      'value_self_transcendence',
      'value_conservation',
      'value_self_enhancement'
    ];
    const traits = mainTraits.concat(childTraits)
    .filter(trait => dt.indexOf(trait.trait_id) !== -1)
    .map(trait => {
      trait.criteria = Math.ceil(this.props.searchedCriteria[trait.trait_id] * 100);
      return trait;
    })
    .map((trait, idx) => (
      <View key={ idx } style={{ marginBottom: 16 }}>
        <Text style={ styles.traitTitle }>
          {`${trait.name.toUpperCase()}: `}
          <Text style={ styles.traitScore }>
          {
            String(trait.score).length === 1 ? `  ${String(trait.score)}%` 
            : String(trait.score).length === 2 ? ` ${String(trait.score)}%`
            : `${String(trait.score)}%`
          }
          <Text style={{ color: '#fafafa' }}> / </Text>
          <Text style={{ color: 'rgba(166,255,203, 0.4)'}}>
            {trait.criteria}%
          </Text>
          </Text>
        </Text>
        <Slider 
          style={{flex: 1, height: 10}}
          value={ trait.score }
          disabled={ true }
          minimumValue={0}
          maximumValue={100}
          trackStyle={ styles.sliderTrack }
          thumbStyle={ styles.sliderThumb }
          thumbTouchSize={{ width: 0, height: 0 }}
          step={1}
          minimumTrackTintColor={'rgb(166,255,203)'}
          maximumTrackTintColor={'rgba(255,255,255, 0)'}
          thumbTintColor={'rgb(255, 255, 255)'}
        />
        <Slider 
          style={{flex: 1, height: 10}}
          value={ trait.criteria }
          disabled={ true }
          minimumValue={0}
          maximumValue={100}
          trackStyle={ styles.sliderTrack }
          thumbStyle={ styles.sliderThumb }
          thumbTouchSize={{ width: 0, height: 0 }}
          step={1}
          minimumTrackTintColor={'rgba(166,255,203, 0.2)'}
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
            <Text style={{ fontSize: 12, letterSpacing: 1.1, fontWeight: 'bold', color: '#fafafa' }}>{ firstname }<Text style={{ color: 'rgb(166,255,203)' }}> {lastname}</Text></Text>
            <Text style={{ fontSize: 9, letterSpacing: 1.1, fontWeight: 'bold', color: 'rgb(18,216,250)' }}>{ jobSeeker.jobSeeker.location.toUpperCase() }, ID</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button 
            title='SEND INVITATION'
            buttonStyle={{padding: 4, paddingLeft: 12, paddingRight: 12, borderRadius: 100, backgroundColor: 'transparent', borderColor: 'rgb(166, 266, 203)', borderWidth: 1}}
            fontSize={ 10 }
            color={'rgb(166, 255, 203)'}
            onPress={() => this._sendEmail(firstname.concat(lastname).join(' '), 'mail@wow.com')}
          />
        </View>

        <View style={ styles.tabWrapper }>
          <TouchableOpacity style={ styles.tab } onPress={() => {this._openTab('personality')}}>
            <Text style={ this.state.isPersonalityTabOpen ? styles.tabTextOpened : styles.tabText}>PERSONALITY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.tab } onPress={() => {this._openTab('summary')}}>
            <Text style={ this.state.isSummaryTabOpen ? styles.tabTextOpened : styles.tabText}>SUMMARY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.tab } onPress={() => {this._openTab('informations')}}>
            <Text style={ this.state.isInformationsTabOpen ? styles.tabTextOpened : styles.tabText}>INFORMATIONS</Text>
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
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 24,
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
    borderBottomWidth: 1,
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
  tabTextOpened: {
    color: 'rgba(166,255,203, 0.2)',
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
    marginBottom: 8,
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
    borderRadius: 0,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    height: 10
  }
});

export default connect(mapStateToProps, null)(JobSeekerProfile);