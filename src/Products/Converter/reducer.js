/*
 *
 * converter reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_USD, UPDATE_RATES } from './constants';

export const initialState = fromJS({
  usd: 0
});

const converterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USD:
      return state.set('usd', action.value);
    case UPDATE_RATES:
      return state.set('rates', fromJS(action.rates));
    default:
      return state;
  }
};

export default converterReducer;
