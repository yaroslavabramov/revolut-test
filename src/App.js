import React, { Component } from 'react';
import styled from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
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
            <Route patch="/pocket" component={Pocket} />
          </Switch>
        </Router>
      </Main>
    );
  }
}

export default App;
