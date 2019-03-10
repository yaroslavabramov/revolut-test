import { SUBSCRIBE_DATA, UPDATE_RATES } from './constants';

const subscribeData = () => ({
  type: SUBSCRIBE_DATA
});

const updateRates = rates => ({
  type: UPDATE_RATES,
  rates
});

export { subscribeData, updateRates };
