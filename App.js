import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Router from './Router';

import { queryJobSeekers, queryJobSeekersByPersonality, queryJobSeekerById } from './graphql-client';

class App extends Component {
  render() {
    return (
      <Provider store={ store } >
        <Router />
      </Provider>
    )
  }
}

export default App;
