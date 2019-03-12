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
  UPDATE_FIELD_CURRENCY,
  UPDATE_VALUE_FROM_INPUT,
  UPDATE_DIALOG_OPENED,
  CLEAR_STORE
} from './constants';

export const initialState = fromJS({
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
    currency: 'GBP'
  },
  activeField: 'to',
  dialogOpened: false
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
    case UPDATE_FIELD_CURRENCY:
      return state.setIn([action.field, 'currency'], action.currency);
    case UPDATE_DIALOG_OPENED:
      return state.set('dialogOpened', action.opened);
    case CLEAR_STORE:
      return state.setIn(['from', 'value'], '').setIn(['to', 'value'], '');
    default:
      return state;
  }
};

export default converterReducer;
