import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { selectPocket } from '../Pocket/selectors';

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
  (from, to, rates) => +rates[to] / +rates[from]
);
/**
 * select active field
 */
const selectActiveField = createSelector(
  selectConverterDomain,
  substate => substate.get('activeField')
);

const selectIsValid = createSelector(
  selectPocket,
  selectFrom,
  (pocket, { value, currency }) => value <= pocket[currency]
);

const selectDialogOpened = createSelector(
  selectConverterDomain,
  substate => substate.get('dialogOpened')
);

const selectLoading = createSelector(
  selectConverterDomain,
  substate => substate.get('loading')
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
  selectActiveField,
  selectIsValid,
  selectDialogOpened,
  selectLoading
};
