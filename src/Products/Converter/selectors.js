import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the converter state domain
 */
const selectConverterDomain = state => state.get('converter', initialState);

/**
 * select rates
 */
const selectRates = createSelector(
  selectConverterDomain,
  substate => substate.get('rates').toJS()
);
/**
 * select convertFrom data
 */
const selectConvertFrom = createSelector(
  selectConverterDomain,
  substate => substate.get('convertFrom').toJS()
);
/**
 * select convertFrom data
 */
const selectConvertFromInput = createSelector(
  selectConvertFrom,
  ({ input }) => input
);

export {
  selectConverterDomain,
  selectRates,
  selectConvertFrom,
  selectConvertFromInput
};
