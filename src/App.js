import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Pocket from './Products/Pocket';
import Converter from './Products/Converter';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/converter" component={Converter} />
          <Route patch="/pocket" component={Pocket} />
        </Switch>
      </Router>
    );
  }
}

export default App;
