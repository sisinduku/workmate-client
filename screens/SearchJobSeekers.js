import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalSelector from 'react-native-modal-selector';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import { Button, Slider, Divider, Card } from 'react-native-elements';

import { getSearchResult } from './../actions/EmployerActions';
import { personality_presets, traitDescriptions } from './../appconfig';
import Background from './components/Background';

const mapStateToProps = (state) => ({
  doneSearching: state.EmployerReducer.doneSearching
});

const mapDispatchToProps = (dispatch) => ({
  getSearchResult: (criteria) => dispatch(getSearchResult(criteria))
});

class SearchJobSeeker extends Component {
  constructor() {
    super();
    this.state = {
      traits: personality_presets.default,
      traitDescriptions: traitDescriptions,
      isSnackbarOpen: false,
      snackbarTitle: '',
      snackbarMessage: ''
    }
  }

  _changeTraitScore(modifiedTrait, score) {
    const traits = this.state.traits;
    const traitIdx = traits.findIndex(trait => trait.name === modifiedTrait);

    traits[traitIdx].score = score;
    this.setState({ traits });
  }

  _setToPresetPersonality(personalityPreset) {
    this.setState({ traits: personality_presets[personalityPreset] });
  }

  _startSearch() {
    const traits = JSON.parse(JSON.stringify(this.state.traits));
    const criteria = traits.reduce( (crit, trait) => {
      crit[trait.type] = trait.score / 100;
      return crit;
    }, {});

    this.props.getSearchResult(criteria);
    this.props.navigation.navigate('JobSeekerList');
  }

  _normalizeName(fullname) {
    return fullname
            .split('_')
            .map(name => name.charAt(0).toUpperCase() + name.slice(1))
            .join(' ');
  }

  _showSnackbar(traitType) {
    const traitIndex = traitDescriptions.findIndex(trait => trait.type === traitType);
    const title = traitDescriptions[traitIndex].name;
    const message = traitDescriptions[traitIndex].descriptions;

    this.setState({
      isSnackbarOpen: true,
      snackbarTitle: title,
      snackbarMessage: message
    });
  }

  _hideSnackbar() {
    this.setState({
      isSnackbarOpen: false,
      snackbarTitle: '',
      snackbarMessage: ''
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const presetPersonalities = Object.keys(personality_presets).map((personality, idx) => ({
      key: idx,
      label: this._normalizeName(personality),
      personality: personality_presets[personality]
    }));

    const createTraitComponent = (trait, idx) => (
      <View key={ idx }>
        <Text style={ styles.traitTitle }>
          {`${trait.name.toUpperCase()}: `}
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
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor={'rgb(166,255,203)'}
          maximumTrackTintColor={'rgb(18,216,250)'}
          thumbTintColor={'rgb(255, 255, 255)'}
          onSlidingStart={ () => this._showSnackbar(trait.type) }
          onSlidingComplete = { () => this._hideSnackbar() }
          onValueChange={ (value) => this._changeTraitScore(trait.name, value) }
        />
      </View> 
    );

    const traits = this.state.traits.map(createTraitComponent);

    return (
      <View style={ styles.container }>
          <View
            style={ this.state.isSnackbarOpen ? styles.openSnackbar : styles.closedSnackbar }
          >
            <Text style={{color: 'rgb(18,216,250)', fontSize: 12, fontWeight: 'bold', letterSpacing: 2}}>{ this.state.snackbarTitle.toUpperCase() }</Text>
            <Text style={{color: 'rgb(166,255,203)', fontSize: 12}}>{ this.state.snackbarMessage }</Text>
          </View>
        <ScrollView>
          <Card
            title="SEARCH BY PERSONALITY"
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
              data={ presetPersonalities }
              initValue="Preset Personalities"
              onChange={(option)=>{ this._setToPresetPersonality(option.label.toLowerCase().replace(/\s/g, '_')) }} />
          </Card>

          <Card 
            containerStyle={ styles.mainCard }
            dividerStyle={ styles.dividerCard }
          >
            { traits }
          </Card>

          <Button
            buttonStyle={ styles.searchButton }
            title='Start Search!'
            color={'rgb(166,255,203)'}
            fontSize={ 16 }
            onPress={ () => this._startSearch() }
            // onPress={() => navigate('JobSeekerList')}
          />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(0, 0, 0)',
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24
  },
  openSnackbar: {
    display: 'flex',
    padding: 24,
    paddingTop: 48,
    borderBottomWidth: 3,
    borderBottomColor: 'rgb(18,216,250)', //'rgb(166,255,203)', 
    width: Dimensions.get('window').width, 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    zIndex: 999, 
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  closedSnackbar: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0
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
  searchButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fafafa',
    borderRadius: 200,
    marginTop: 16,
    marginBottom: 48,
    marginLeft: 24,
    marginRight: 24,
    paddingTop: 12,
    paddingBottom: 12
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchJobSeeker);