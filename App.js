import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './screens/Home';

const rootNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Workmate'
    }
  }
});

export default rootNavigator;
