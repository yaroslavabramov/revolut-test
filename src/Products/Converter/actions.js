import {
  SUBSCRIBE_RATES,
  UPDATE_RATES,
  CANCEL_SUBSCRIPTION,
  UPDATE_FIELD_VALUE,
  UPDATE_CURRENCY,
  UPDATE_VALUE_FROM_INPUT
} from './constants';

/**
 * subscribe rates data
 */
const subscribeRates = () => ({
  type: SUBSCRIBE_RATES
});

const cancelSubscription = () => ({
  type: CANCEL_SUBSCRIPTION
});

const updateRates = rates => ({
  type: UPDATE_RATES,
  rates
});
/**
 * update value for one of fields
 * @param {String} field
 * @param {String} value
 */
const updateFieldValue = (field, value) => ({
  type: UPDATE_FIELD_VALUE,
  field,
  value
});
/**
 * update currency for one of fields
 * @param {String} field
 * @param {String} value
 */
const updateCurrency = (field, value) => ({
  type: UPDATE_CURRENCY,
  value,
  field
});
/**
 * update value from input fields
 * @param {String} field
 * @param {String} value
 */
const updateValueFromInput = (field, value) => ({
  type: UPDATE_VALUE_FROM_INPUT,
  field,
  value
});

export {
  subscribeRates,
  cancelSubscription,
  updateRates,
  updateFieldValue,
  updateCurrency,
  updateValueFromInput
};
