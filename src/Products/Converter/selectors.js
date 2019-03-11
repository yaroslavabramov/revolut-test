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
const selectFrom = createSelector(
  selectConverterDomain,
  substate => substate.get('from').toJS()
);
/**
 * select convertFrom value
 */
const selectFromValue = createSelector(
  selectFrom,
  ({ value }) => value
);
/**
 * select convertFrom currency
 */
const selectFromCurr = createSelector(
  selectFrom,
  ({ currency }) => currency
);
/**
 * select convertTodata
 */
const selectTo = createSelector(
  selectConverterDomain,
  substate => substate.get('to').toJS()
);
/**
 * select convertTo value
 */
const selectToValue = createSelector(
  selectTo,
  ({ value }) => value
);
/**
 * select convertTo currency
 */
const selectToCurr = createSelector(
  selectTo,
  ({ currency }) => currency
);
/**
 * select coefficient between currencies
 */
const selectCoef = createSelector(
  selectFromCurr,
  selectToCurr,
  selectRates,
  (from, to, rates) => +rates[from] / +rates[to]
);
/**
 * select active field
 */
const selectActiveField = createSelector(
  selectConverterDomain,
  substate => substate.get('activeField')
);

export {
  selectConverterDomain,
  selectRates,
  selectFrom,
  selectFromValue,
  selectFromCurr,
  selectCoef,
  selectTo,
  selectToValue,
  selectToCurr,
  selectActiveField
};
