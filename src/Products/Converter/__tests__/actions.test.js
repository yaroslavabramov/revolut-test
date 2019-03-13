import {
  SUBSCRIBE_RATES,
  UPDATE_RATES,
  CANCEL_SUBSCRIPTION,
  UPDATE_FIELD_VALUE,
  UPDATE_FIELD_CURRENCY,
  UPDATE_VALUE_FROM_INPUT
} from '../constants';
import {
  subscribeRates,
  updateRates,
  cancelSubscription,
  updateFieldValue,
  updateValueFromInput,
  updateFieldCurrency
} from '../actions';

describe('Converter actions', () => {
  it('has a type of SUBSCRIBE_RATES', () => {
    const expected = {
      type: SUBSCRIBE_RATES
    };
    expect(subscribeRates()).toEqual(expected);
  });
  it('has a type of UPDATE_RATES', () => {
    const rates = { USD: 1, EUR: 2 };
    const expected = {
      type: UPDATE_RATES,
      rates
    };
    expect(updateRates(rates)).toEqual(expected);
  });
  it('has a type of CANCEL_SUBSCRIPTION', () => {
    const expected = {
      type: CANCEL_SUBSCRIPTION
    };
    expect(cancelSubscription()).toEqual(expected);
  });
  it('has a type of UPDATE_FIELD_VALUE', () => {
    const field = 'from';
    const value = '123';
    const expected = {
      type: UPDATE_FIELD_VALUE,
      field,
      value
    };
    expect(updateFieldValue(field, value)).toEqual(expected);
  });
  it('has a type of UPDATE_VALUE_FROM_INPUT', () => {
    const field = 'from';
    const value = '123';
    const expected = {
      type: UPDATE_VALUE_FROM_INPUT,
      field,
      value
    };
    expect(updateValueFromInput(field, value)).toEqual(expected);
  });
  it('has a type of UPDATE_FIELD_CURRENCY', () => {
    const field = 'from';
    const currency = 'EUR';
    const expected = {
      type: UPDATE_FIELD_CURRENCY,
      field,
      currency
    };
    expect(updateFieldCurrency(field, currency)).toEqual(expected);
  });
});
