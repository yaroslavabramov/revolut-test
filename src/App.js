import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Pocket from './Products/Pocket';
import Converter from './Products/Converter';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/converter" component={Converter} />
          <Route patch="/pocket" component={Pocket} />
        </Switch>
      </Router>
    );
  }
}

export default App;
