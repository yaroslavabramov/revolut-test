import { fromJS } from 'immutable';

import converterReducer, { initialState } from '../reducer';
import {
  updateRates,
  updateFieldValue,
  updateFieldCurrency,
  updateValueFromInput
} from '../actions';

describe('converterReducer', () => {
  it('returns the initial state', () => {
    expect(converterReducer(undefined, {})).toEqual(initialState);
  });
  it('updates rates', () => {
    const rates = {
      USD: 1,
      EUR: 2
    };
    const expected = initialState
      .set('rates', fromJS(rates))
      .set('loading', false);
    expect(converterReducer(initialState, updateRates(rates))).toEqual(
      expected
    );
  });
  it('updates field value', () => {
    const expected = initialState.setIn(['from', 'value'], '123');
    expect(
      converterReducer(initialState, updateFieldValue('from', '123'))
    ).toEqual(expected);
  });
  it('updates field value from input', () => {
    const expected = initialState
      .setIn(['from', 'value'], '123')
      .set('activeField', 'from');
    expect(
      converterReducer(initialState, updateValueFromInput('from', '123'))
    ).toEqual(expected);
  });
  it('updates currency', () => {
    const expected = initialState.setIn(['from', 'currency'], 'EUR');
    expect(
      converterReducer(initialState, updateFieldCurrency('from', 'EUR'))
    ).toEqual(expected);
  });
});
