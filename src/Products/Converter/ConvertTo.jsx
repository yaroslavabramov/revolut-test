import React from 'react';
import { connect } from 'react-redux';
import { TextField, MenuItem } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectToValue, selectToCurr } from './selectors';
import { updateValueFromInput, updateFieldCurrency } from './actions';
import { numbericRegexp } from '../../utils/regexps';
import { Section, InputsRow } from './elements';
import { selectPocket } from '../Pocket/selectors';
import { currencies } from './constants';

const ConvertTo = ({
  value,
  handleInputChange,
  currency,
  handleCurrencyChange,
  pocket
}) => {
  return (
    <Section>
      <InputsRow>
        <TextField
          select
          value={currency}
          onChange={handleCurrencyChange}
          label="Currency"
          variant="filled"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Convert To"
          onChange={handleInputChange}
          value={value}
          variant="filled"
        />
      </InputsRow>
      you have: {pocket[currency]}
    </Section>
  );
};

const mapStateToProps = createStructuredSelector({
  value: selectToValue,
  currency: selectToCurr,
  pocket: selectPocket
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: e => {
    const { value } = e.target;
    if (numbericRegexp.test(value)) {
      dispatch(updateValueFromInput('to', value));
    }
  },
  handleCurrencyChange: e => {
    const { value } = e.target;
    dispatch(updateFieldCurrency('to', value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertTo);
