import { UPDATE_FIELD, EXCHANGE_VALUES } from './constants';

const updateField = (field, value) => ({
  type: UPDATE_FIELD,
  value,
  field
});

const exchangeValues = (from, to) => ({
  type: EXCHANGE_VALUES,
  from,
  to
});

export { updateField, exchangeValues };
