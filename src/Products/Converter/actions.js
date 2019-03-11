import {
  SUBSCRIBE_DATA,
  UPDATE_RATES,
  CANCEL_SUBSCRIBE,
  UPDATE_FIELD_VALUE,
  UPDATE_CURRENCY,
  UPDATE_VALUE_FROM_INPUT
} from './constants';

const subscribeData = () => ({
  type: SUBSCRIBE_DATA
});

const cancelSubscribe = () => ({
  type: CANCEL_SUBSCRIBE
});

const updateRates = rates => ({
  type: UPDATE_RATES,
  rates
});

const updateFieldValue = (field, value) => ({
  type: UPDATE_FIELD_VALUE,
  field,
  value
});

const updateCurrency = (field, value) => ({
  type: UPDATE_CURRENCY,
  value,
  field
});

const updateValueFromInput = (field, value) => ({
  type: UPDATE_VALUE_FROM_INPUT,
  field,
  value
});

export {
  subscribeData,
  cancelSubscribe,
  updateRates,
  updateFieldValue,
  updateCurrency,
  updateValueFromInput
};
