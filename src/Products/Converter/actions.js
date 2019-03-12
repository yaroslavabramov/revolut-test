import {
  SUBSCRIBE_RATES,
  UPDATE_RATES,
  CANCEL_SUBSCRIPTION,
  UPDATE_FIELD_VALUE,
  UPDATE_FIELD_CURRENCY,
  UPDATE_VALUE_FROM_INPUT,
  EXCHANGE_CLICKED,
  UPDATE_DIALOG_OPENED
} from './constants';

/**
 * subscribe rates data
 */
const subscribeRates = () => ({
  type: SUBSCRIBE_RATES
});

const exchangeClicked = () => ({
  type: EXCHANGE_CLICKED
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
 * @param {String} currency
 */
const updateFieldCurrency = (field, currency) => ({
  type: UPDATE_FIELD_CURRENCY,
  currency,
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
/**
 * update opened state for modal dialog
 */
const updateDialogOpened = opened => ({
  type: UPDATE_DIALOG_OPENED,
  opened
});

export {
  subscribeRates,
  exchangeClicked,
  cancelSubscription,
  updateRates,
  updateFieldValue,
  updateFieldCurrency,
  updateValueFromInput,
  updateDialogOpened
};
