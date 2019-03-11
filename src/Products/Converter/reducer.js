/*
 *
 * converter reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_USD,
  UPDATE_RATES,
  UPDATE_FIELD_VALUE,
  UPDATE_CURRENCY,
  UPDATE_VALUE_FROM_INPUT
} from './constants';

export const initialState = fromJS({
  usd: 0,
  rates: {
    USD: 1,
    EUR: 2,
    GBP: 2.5
  },
  from: {
    value: '',
    currency: 'USD'
  },
  to: {
    value: '',
    currency: 'USD'
  },
  activeField: 'to'
});

const converterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USD:
      return state.set('usd', action.value);
    case UPDATE_RATES:
      return state.set('rates', fromJS({ ...action.rates, USD: 1 }));
    case UPDATE_FIELD_VALUE:
      return state.setIn([action.field, 'value'], action.value);
    case UPDATE_VALUE_FROM_INPUT:
      return state
        .setIn([action.field, 'value'], action.value)
        .set('activeField', action.field);
    case UPDATE_CURRENCY:
      return state.setIn([action.field, 'currency'], action.value);
    default:
      return state;
  }
};

export default converterReducer;
