import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Slider, Divider, Card } from 'react-native-elements'

export default class SearchJobSeeker extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>

        <Card title="PERSONALITY">

          <View>
            <Text>Openness:</Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Extraversion:</Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Agreeableness:</Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Conscientiousness: </Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Curiousity:</Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Ideal: </Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Challenge: </Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Practicality: </Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Stimulation:</Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Helping Others:</Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Tradition:</Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>

          <View>
            <Text>Achievement:</Text>
            <Slider 
              style={{width: 250}}
              minimumValue={0}
              maximumValue={100}
              step={1}
            />
          </View>
        </Card>

        <Button
          style={{ marginTop: 16, marginBottom: 16 }}
          title='Search'
          onPress={() => navigate('JobSeekerList')}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});