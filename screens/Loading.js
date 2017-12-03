import React, { Component } from 'react';
import { 
  View, 
  ActivityIndicator
} from 'react-native'

class Loading extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#000',
        alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ccc" />
      </View>  
    )
  }
}
export default Loading