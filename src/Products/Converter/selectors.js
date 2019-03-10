import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the converter state domain
 */
const selectConverterDomain = state => state.get('converter', initialState);

/**
 * select rates
 */
const selectRates = () =>
  createSelector(
    selectConverterDomain,
    substate => substate.get('rates').toJS()
  );

export { selectConverterDomain, selectRates };
