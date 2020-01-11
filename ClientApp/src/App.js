import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './components/MainComponent'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render(){
    return(
    <Router>
      <div>
        <Main/>
      </div>
    </Router>

    )
  }
}