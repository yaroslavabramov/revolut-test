import { combineReducers } from 'redux-immutable';
import pocketReducer from './Products/Pocket/reducer';
import converterReducer from './Products/Converter/reducer';

export default combineReducers({
  pocket: pocketReducer,
  converter: converterReducer
});
