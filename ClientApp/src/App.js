import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './components/MainComponent'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import './custom.css'

const store = ConfigureStore();

export default class App extends Component {
  static displayName = App.name;

  render(){
    return(
    <Provider store={store}>
      <Router>
        <div>
          <Main/>
        </div>
      </Router>
    </Provider>

    )
  }
}