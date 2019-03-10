import { SUBSCRIBE_DATA, UPDATE_RATES, CANCEL_SUBSCRIBE } from './constants';

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

export { subscribeData, cancelSubscribe, updateRates };
