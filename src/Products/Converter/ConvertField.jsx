import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { Section, InputsRow } from './elements';
import { currencies } from './constants';

const ConvertField = ({
  data: { value, currency },
  handleInputChange,
  handleCurrencyChange,
  pocket,
  inputLabel
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
          label={inputLabel}
          onChange={handleInputChange}
          value={value}
          variant="filled"
        />
      </InputsRow>
      you have: {pocket[currency]}
    </Section>
  );
};

export default ConvertField;
