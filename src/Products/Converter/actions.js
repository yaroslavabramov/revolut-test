import {
  SUBSCRIBE_DATA,
  UPDATE_RATES,
  CANCEL_SUBSCRIBE,
  UPDATE_INPUT
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

const updateInput = (field, value) => ({
  type: UPDATE_INPUT,
  field,
  value
});

export { subscribeData, cancelSubscribe, updateRates, updateInput };
