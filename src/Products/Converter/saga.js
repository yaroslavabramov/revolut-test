import {
  all,
  call,
  delay,
  put,
  takeEvery,
  takeLatest,
  race,
  take,
  select
} from 'redux-saga/effects';
import {
  SUBSCRIBE_DATA,
  CANCEL_SUBSCRIBE,
  UPDATE_CURRENCY,
  UPDATE_VALUE_FROM_INPUT
} from './constants';
import { updateRates, updateFieldValue } from './actions';
import {
  selectActiveField,
  selectCoef,
  selectFromValue,
  selectToValue
} from './selectors';

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

export function* recountValues() {
  const activeField = yield select(selectActiveField);
  const coefficient = yield select(selectCoef);
  const changeField = activeField === 'from' ? 'to' : 'from';
  let resultValue;
  if (activeField === 'from') {
    const valueFrom = yield select(selectFromValue);
    resultValue = valueFrom ? valueFrom * coefficient : '';
  } else {
    const valueTo = yield select(selectToValue);
    resultValue = valueTo ? valueTo / coefficient : '';
  }
  yield put(updateFieldValue(changeField, resultValue));
}

export function* debouncedRecountValues() {
  yield delay(100);
  yield call(recountValues);
}

export default function* converterSaga() {
  yield takeEvery(SUBSCRIBE_DATA, subscribeData);
  yield takeEvery(UPDATE_CURRENCY, recountValues);
  yield takeLatest(UPDATE_VALUE_FROM_INPUT, debouncedRecountValues);
}
