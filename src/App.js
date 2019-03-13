import React, { Component } from 'react';
import styled from 'styled-components';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import Pocket from './Products/Pocket';
import Converter from './Products/Converter';

const Main = styled.main`
  text-align: center;
`;
class App extends Component {
  render() {
    return (
      <Main>
        <Router history={history}>
          <Switch>
            <Route path="/converter" component={Converter} />
            <Route path="/pocket" component={Pocket} />
            <Redirect from="/" to="/pocket" />
          </Switch>
        </Router>
      </Main>
    );
  }
}

export default App;
