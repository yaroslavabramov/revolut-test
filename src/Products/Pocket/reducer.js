/*
 *
 * pocket reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_FIELD, EXCHANGE_VALUES } from './constants';
import { round } from '../../utils/math';

export const initialState = fromJS({
  USD: 12.4,
  EUR: 14.4,
  GBP: 4.7
});

const pocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return state.set(action.field, action.value);
    case EXCHANGE_VALUES: {
      const { currency: fromCurrency, value: fromDiff } = action.from;
      const { currency: toCurrency, value: toDiff } = action.to;
      const fromValue = state.get(fromCurrency);
      const toValue = state.get(toCurrency);
      return state
        .set(fromCurrency, round(fromValue - +fromDiff))
        .set(toCurrency, round(toValue + +toDiff));
    }
    default:
      return state;
  }
};

export default pocketReducer;
