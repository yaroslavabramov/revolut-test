import { fromJS } from 'immutable';
import {
  selectRates,
  selectFrom,
  selectFromValue,
  selectFromCurr,
  selectCoef,
  selectTo,
  selectToValue,
  selectToCurr,
  selectActiveField
} from '../selectors';

describe('selectors for main tab in case details', () => {
  it('select rates', () => {
    const rates = {
      USD: '123',
      EUR: '234'
    };
    const localState = fromJS({
      converter: {
        rates
      }
    });
    expect(selectRates(localState)).toEqual(rates);
  });
  it('select From field', () => {
    const from = {
      value: '123',
      currency: 'EUR'
    };
    const localState = fromJS({
      converter: {
        from
      }
    });
    expect(selectFrom(localState)).toEqual(from);
  });
  it('select active field', () => {
    const localState = fromJS({
      converter: {
        activeField: 'to'
      }
    });
    expect(selectActiveField(localState)).toEqual('to');
  });
  it('select From value', () => {
    const from = {
      value: '123',
      currency: 'EUR'
    };
    const localState = fromJS({
      converter: {
        from
      }
    });
    expect(selectFromValue(localState)).toEqual(from.value);
  });
  it('select From currency', () => {
    const from = {
      value: '123',
      currency: 'EUR'
    };
    const localState = fromJS({
      converter: {
        from
      }
    });
    expect(selectFromCurr(localState)).toEqual(from.currency);
  });
  it('select To field', () => {
    const to = {
      value: '123',
      currency: 'EUR'
    };
    const localState = fromJS({
      converter: {
        to
      }
    });
    expect(selectTo(localState)).toEqual(to);
  });
  it('select To Value', () => {
    const to = {
      value: '123',
      currency: 'EUR'
    };
    const localState = fromJS({
      converter: {
        to
      }
    });
    expect(selectToValue(localState)).toEqual(to.value);
  });
  it('select To field', () => {
    const to = {
      value: '123',
      currency: 'EUR'
    };
    const localState = fromJS({
      converter: {
        to
      }
    });
    expect(selectToCurr(localState)).toEqual(to.currency);
  });
  it('select To field', () => {
    const to = {
      currency: 'EUR'
    };
    const from = {
      currency: 'USD'
    };
    const rates = {
      USD: '1',
      EUR: '1.23'
    };
    const expected = 1.23 / 1;
    const localState = fromJS({
      converter: {
        rates,
        to,
        from
      }
    });
    expect(selectCoef(localState)).toEqual(expected);
  });
});
