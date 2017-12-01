import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import profileReduce from './reducers/ProfileReduce'
import Router from './Router'

const store = createStore(profileReduce)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
export default App;