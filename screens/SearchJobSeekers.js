import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Button, Slider, Divider, Card } from 'react-native-elements';
import Background from './components/Background';

export default class SearchJobSeeker extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const deviceWidth = Dimensions.get('window').width;
    const traits = [
    {type: 'openness', score: 100},
    {type: 'extraversion', score: 99},
    {type: 'agreeableness', score: 5},
    {type: 'conscientiousness', score: 0},
    {type: 'curiousity', score: 100},
    {type: 'ideal', score: 100},
    {type: 'challenge', score: 100},
    {type: 'practicality', score: 100},
    {type: 'stimulation', score: 100},
    {type: 'helping others', score: 100},
    {type: 'tradition', score: 100},
    {type: 'achievement', score: 100}
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
        <Text style={ styles.traitDescription }>
          Lorem ipsum lalala nanana bababa cacaca tatata
        </Text>
        <Slider 
          style={{flex: 1}}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor={'rgb(166,255,203)'}
          maximumTrackTintColor={'rgb(18,216,250)'}
          thumbTintColor={'rgb(255, 255, 255)'}
        />
      </View>
    ));

    return (
      <View style={ styles.container }>
        <ScrollView>
          <Card 
            title="PERSONALITY" 
            containerStyle={ styles.mainCard }
            titleStyle={ styles.titleCard }
            dividerStyle={ styles.dividerCard }
          >
            { traits }
          </Card>

          <Button
            buttonStyle={ styles.searchButton }
            title='Search'
            onPress={() => navigate('JobSeekerList')}
          />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(0, 0, 0)',
    flex: 1
  },
  mainCard: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 4,
    borderWidth: 0
  },
  titleCard: {
    color: 'rgb(255, 255, 255)',
    letterSpacing: 2,
    fontWeight: '200'
  },
  dividerCard: {
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
  traitDescription: {
    color: '#fafafa',
    fontSize: 10,
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 5
  },
  searchButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fafafa',
    borderRadius: 200,
    marginTop: 16,
    marginBottom: 48
  }
});