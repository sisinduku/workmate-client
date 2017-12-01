import React, { Component } from 'react';
import ModalSelector from 'react-native-modal-selector';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import { Button, Slider, Divider, Card } from 'react-native-elements';


import { personality_presets } from './../appconfig';
import Background from './components/Background';

export default class SearchJobSeeker extends Component {
  constructor() {
    super();
    this.state = {
      traits: personality_presets.default
    }
  }

  _changeTraitScore(modifiedTrait, score) {
    const traits = this.state.traits;
    const traitIdx = traits.findIndex(trait => trait.type === modifiedTrait);

    traits[traitIdx].score = score;
    this.setState({ traits });
  }

  _setToPresetPersonality(personalityPreset) {
    this.setState({ traits: personality_presets[personalityPreset] });
  }

  _startSearch() {
    // sementara sebelum tembak ke API
    // this.props.navigation.navigate('JobSeekerList');
  }

  render() {
    const { navigate } = this.props.navigation;
    const presetPersonalities = Object.keys(personality_presets).map((personality, idx) => ({
      key: idx,
      label: personality.replace(/_/g, ' '),
      personality: personality_presets[personality]
    }));

    const createTraitComponent = (trait, idx) => (
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
          value={ trait.score }
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor={'rgb(166,255,203)'}
          maximumTrackTintColor={'rgb(18,216,250)'}
          thumbTintColor={'rgb(255, 255, 255)'}
          onValueChange={ (value) => this._changeTraitScore(trait.type, value) }
        />
      </View> 
    );

    const traits = this.state.traits.map(createTraitComponent);

    return (
      <View style={ styles.container }>
        <ScrollView>
          <Card
            title="PERSONALITY"
            containerStyle={ styles.mainCard }
            titleStyle={ styles.titleCard }
            dividerStyle={ styles.dividerCard }
          >
            <ModalSelector
              selectStyle={{borderRadius: 200}}
              selectTextStyle={{color: 'rgb(166,255,203)'}}
              optionContainerStyle={{backgroundColor: 'rgba(0,0,0,0.88)'}}
              optionStyle={{borderBottomWidth: 0.4}}
              optionTextStyle={{color: 'rgb(166,255,203)'}}
              cancelStyle={{backgroundColor: 'rgba(0,0,0,0.88)'}}
              cancelTextStyle={{color: '#fafafa'}}
              backdropPressToClose={true}
              data={presetPersonalities}
              initValue="Preset Personalities"
              onChange={(option)=>{ this._setToPresetPersonality(option.label.replace(/\s/g, '_')) }} />
          </Card>

          <Card 
            containerStyle={ styles.mainCard }
            dividerStyle={ styles.dividerCard }
          >
            { traits }
          </Card>

          <Button
            buttonStyle={ styles.searchButton }
            title='Search'
            // onPress={ () => this._startSearch() }
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