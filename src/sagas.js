import { all } from 'redux-saga/effects';
import converterSaga from './Products/Converter/saga';

function* rootSaga() {
  yield all([converterSaga()]);
}

export default rootSaga;
