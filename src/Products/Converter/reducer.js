/*
 *
 * converter reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_USD, UPDATE_RATES, UPDATE_INPUT } from './constants';

export const initialState = fromJS({
  usd: 0,
  rates: {
    USD: 1,
    EUR: 2,
    GBP: 2.5
  },
  convertFrom: {
    input: {
      value: '',
      error: false
    },
    currency: 'USD'
  },
  convertTo: {
    input: {
      value: '',
      error: false
    },
    currency: 'USD'
  }
});

const converterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USD:
      return state.set('usd', action.value);
    case UPDATE_RATES:
      return state.set('rates', fromJS({ ...action.rates, USD: 1 }));
    case UPDATE_INPUT:
      return state
        .setIn([action.field, 'input', 'value'], action.value)
        .setIn([action.field, 'input', 'error'], false);
    default:
      return state;
  }
};

export default converterReducer;
