import {
  all,
  call,
  delay,
  put,
  takeEvery,
  race,
  take
} from 'redux-saga/effects';
import { SUBSCRIBE_DATA, CANCEL_SUBSCRIBE } from './constants';
import { updateRates } from './actions';

const getRates = async () => {
  try {
    const response = await fetch(
      'https://openexchangerates.org/api/latest.json?app_id=bb16478b4da442c99aafe75fd3d13158e'
    );
    if (response.ok) return response.json();
    else throw new Error('response is not ok');
  } catch (e) {
    throw new Error(e);
  }
};

export function* fetchRates() {
  try {
    const {
      rates: { GBP, EUR }
    } = yield getRates();
    yield put(updateRates({ GBP, EUR }));
  } catch (e) {
    console.error(e);
  }
}

export function* startSubscribe() {
  while (true) {
    yield all([delay(100000), call(fetchRates)]);
  }
}

export function* subscribeData() {
  yield race({
    subscribe: call(startSubscribe),
    cancel: take(CANCEL_SUBSCRIBE)
  });
}

export default function* converterSaga() {
  yield takeEvery(SUBSCRIBE_DATA, subscribeData);
}
