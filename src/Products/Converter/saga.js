import {
  all,
  call,
  delay,
  put,
  takeEvery,
  race,
  take,
  select
} from 'redux-saga/effects';

import {
  SUBSCRIBE_RATES,
  CANCEL_SUBSCRIPTION,
  UPDATE_CURRENCY,
  UPDATE_VALUE_FROM_INPUT,
  UPDATE_RATES
} from './constants';
import { updateRates, updateFieldValue } from './actions';
import {
  selectActiveField,
  selectCoef,
  selectFromValue,
  selectToValue
} from './selectors';
import { getRates } from './api';

/**
 * fetch rates from backend
 */
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
/**
 * start subscription for rates
 */
export function* startSubscription() {
  while (true) {
    yield all([delay(10000), call(fetchRates)]);
  }
}
/**
 * manage rates data subscription
 */
export function* subscribeRates() {
  yield race({
    subscribe: call(startSubscription),
    cancel: take(CANCEL_SUBSCRIPTION)
  });
}
/**
 * recount values for inputs
 *
 */
export function* recountValues() {
  // TODO refactor this hell
  const activeField = yield select(selectActiveField);
  const coefficient = yield select(selectCoef);
  const changeField = activeField === 'from' ? 'to' : 'from';
  let resultValue;
  if (activeField === 'from') {
    const valueFrom = yield select(selectFromValue);
    resultValue = valueFrom
      ? Math.round(valueFrom * coefficient * 100) / 100
      : '';
  } else {
    const valueTo = yield select(selectToValue);
    resultValue = valueTo
      ? Math.round((valueTo / coefficient) * 100) / 100
      : '';
  }
  yield put(updateFieldValue(changeField, resultValue.toString()));
}
/**
 * debouncer for recount values
 */
export function* debouncedRecountValues() {
  yield delay(500);
  yield call(recountValues);
}
/**
 * converter UI whatchers
 */
export default function* converterSaga() {
  yield takeEvery(SUBSCRIBE_RATES, subscribeRates);
  yield takeEvery([UPDATE_CURRENCY, UPDATE_RATES], recountValues);
  yield takeEvery(UPDATE_VALUE_FROM_INPUT, debouncedRecountValues);
}
