import { all, call, delay, put, takeEvery } from 'redux-saga/effects';
import { SUBSCRIBE_DATA } from './constants';
import { updateRates } from './actions';

const sendRequest = () => {
  return fetch(
    'https://openexchangerates.org/api/latest.json?app_id=bb16478b4da442c99aafe75fd3d13158'
  ).then(response => response.json());
};

export function* fetchRates() {
  const { rates } = yield sendRequest();
  yield put(updateRates(rates));
}

export function* startSubscribe() {
  while (true) {
    yield all([delay(10000), call(fetchRates)]);
  }
}

export default function* converterSaga() {
  yield takeEvery(SUBSCRIBE_DATA, startSubscribe);
}
