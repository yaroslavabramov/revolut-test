import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

/**
 * Config for redux devtools
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
/**
 * Add redux devtools and redux-thunk middleware
 */
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

/**
 * Root component for wrap application with store
 */
const Root = props => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.shape({}).isRequired
};

export default Root;
