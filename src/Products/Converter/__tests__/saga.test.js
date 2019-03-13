import { call, delay, put, takeEvery, race, take } from 'redux-saga/effects';
import {
  SUBSCRIBE_RATES,
  CANCEL_SUBSCRIPTION,
  UPDATE_FIELD_CURRENCY,
  UPDATE_VALUE_FROM_INPUT,
  UPDATE_RATES
} from '../constants';
import converterSaga, {
  subscribeRates,
  recountValues,
  debouncedRecountValues,
  startSubscription,
  fetchRates
} from '../saga';
import { getRates } from '../../../utils/api';
import { updateRates, updateFieldValue } from '../actions';

describe('converter saga', () => {
  describe('default saga. should set listeners', () => {
    const generator = converterSaga();
    it('should set listener for SUBSCRIBE_RATES aciton', () => {
      const listenerDescriptor = generator.next().value;
      expect(listenerDescriptor).toEqual(
        takeEvery(SUBSCRIBE_RATES, subscribeRates)
      );
    });
    it('should set listener for UPDATE_FIELD_CURRENCY and UPDATE_RATES action', () => {
      const listenerDescriptor = generator.next().value;
      expect(listenerDescriptor).toEqual(
        takeEvery([UPDATE_FIELD_CURRENCY, UPDATE_RATES], recountValues)
      );
    });
    it('should set listener for UPDATE_VALUE_FROM_INPUT aciton', () => {
      const listenerDescriptor = generator.next().value;
      expect(listenerDescriptor).toEqual(
        takeEvery(UPDATE_VALUE_FROM_INPUT, debouncedRecountValues)
      );
    });
  });
  describe('subscribeRates saga', () => {
    const generator = subscribeRates();
    it('should start race', () => {
      const raceDescriptor = generator.next().value;
      expect(raceDescriptor).toEqual(
        race({
          subscribe: call(startSubscription),
          cancel: take(CANCEL_SUBSCRIPTION)
        })
      );
    });
  });
  describe('fetchRates saga', () => {
    let generator;
    beforeEach(() => {
      generator = fetchRates();
    });
    it('should fetch rates', () => {
      const requestDescriptor = generator.next().value;
      expect(requestDescriptor).toEqual(getRates());
    });
    it('should send data to store', () => {
      generator.next();
      const rates = {
        EUR: '123',
        GBP: '234'
      };
      const putDescriptor = generator.next({ rates }).value;
      expect(putDescriptor).toEqual(put(updateRates(rates)));
    });
    it('should log error in conole', () => {
      generator.next();
      const error = new Error('smth wrong!');
      const logDescriptor = generator.throw(error).value;
      expect(logDescriptor).toEqual(call(console.error, error));
    });
  });
  describe('recount values saga', () => {
    let generator;
    beforeEach(() => {
      generator = recountValues();
    });
    it('should select active field', () => {
      const selectorDescriptor = generator.next().value;
      expect(selectorDescriptor).toMatchSnapshot();
    });
    it('should select coefficient', () => {
      generator.next();
      const selectorDescriptor = generator.next('from').value;
      expect(selectorDescriptor).toMatchSnapshot();
    });
    it('should select from value', () => {
      generator.next();
      generator.next('from');
      const selectorDescriptor = generator.next(0.4).value;
      expect(selectorDescriptor).toMatchSnapshot();
    });
    it('should select to value', () => {
      generator.next();
      generator.next('to');
      const selectorDescriptor = generator.next(0.4).value;
      expect(selectorDescriptor).toMatchSnapshot();
    });
    it('should put new data to store for from field', () => {
      generator.next();
      generator.next('from');
      generator.next(0.4);
      const putDescriptor = generator.next(123).value;
      const result = Math.round(123 * 0.4 * 100) / 100;
      expect(putDescriptor).toEqual(
        put(updateFieldValue('to', result.toString()))
      );
    });
    it('should put new data to store for to field', () => {
      generator.next();
      generator.next('to');
      generator.next(0.4);
      const putDescriptor = generator.next(123).value;
      const result = Math.round((123 / 0.4) * 100) / 100;
      expect(putDescriptor).toEqual(
        put(updateFieldValue('from', result.toString()))
      );
    });
  });
  describe('debouncedRecountValues saga', () => {
    const generator = debouncedRecountValues();
    it('should delay for 100ms', () => {
      const delayDescriptor = generator.next().value;
      expect(delayDescriptor).toEqual(delay(100));
    });
    it('should call recountValues', () => {
      const delayDescriptor = generator.next().value;
      expect(delayDescriptor).toEqual(call(recountValues));
    });
  });
});
