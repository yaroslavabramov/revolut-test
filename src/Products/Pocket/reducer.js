/*
 *
 * pocket reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_USD } from './constants';

export const initialState = fromJS({
  usd: 0
});

const pocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USD:
      return state.set('usd', action.value);
    default:
      return state;
  }
};

export default pocketReducer;
