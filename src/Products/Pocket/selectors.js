import { initialState } from './reducer';
import { createSelector } from 'reselect';
/**
 * Direct selector to the pocket state domain
 */
const selectPocketDomain = state => state.get('pocket', initialState);

const selectPocket = createSelector(
  selectPocketDomain,
  substate => substate.toJS()
);

export { selectPocketDomain, selectPocket };
