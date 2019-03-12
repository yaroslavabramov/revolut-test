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
import history from '../../history';

import {
  SUBSCRIBE_RATES,
  CANCEL_SUBSCRIPTION,
  UPDATE_FIELD_CURRENCY,
  UPDATE_VALUE_FROM_INPUT,
  UPDATE_RATES,
  EXCHANGE_CLICKED
} from './constants';
import { updateRates, updateFieldValue, updateDialogOpened } from './actions';
import {
  selectActiveField,
  selectCoef,
  selectFrom,
  selectTo,
  selectFromValue,
  selectToValue,
  selectIsValid
} from './selectors';
import { getRates } from './api';
import { exchangeValues } from '../Pocket/actions';
import { round } from '../../utils/math';

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
    yield call(console.error, e);
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
    resultValue = valueFrom ? round(valueFrom * coefficient) : '';
  } else {
    const valueTo = yield select(selectToValue);
    resultValue = valueTo ? round(valueTo / coefficient) : '';
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
 * check validation and update pocket values
 */
export function* exchange() {
  const isValid = yield select(selectIsValid);
  if (isValid) {
    const from = yield select(selectFrom);
    const to = yield select(selectTo);
    yield put(exchangeValues(from, to));
    history.push('./pocket');
  } else {
    yield put(updateDialogOpened(true));
  }
}
/**
 * converter UI listeners
 */
export default function* converterSaga() {
  yield takeEvery(SUBSCRIBE_RATES, subscribeRates);
  yield takeEvery([UPDATE_FIELD_CURRENCY, UPDATE_RATES], recountValues);
  yield takeEvery(UPDATE_VALUE_FROM_INPUT, debouncedRecountValues);
  yield takeEvery(EXCHANGE_CLICKED, exchange);
}
