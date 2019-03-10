import { combineReducers } from 'redux';
import pocketReducer from './Products/Pocket/reducer';

export default combineReducers({
  pocket: pocketReducer
});
