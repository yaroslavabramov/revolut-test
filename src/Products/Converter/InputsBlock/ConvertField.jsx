import React from 'react';
import { InputsRow, Selector, Input, Block } from './elements';
import { WiredRadio } from 'react-wired';
import { currencies } from '../constants';

const ConvertField = ({
  data: { value, currency },
  handleInputChange,
  handleCurrencyChange,
  pocket,
  inputLabel
}) => {
  return (
    <Block>
      <InputsRow>
        <Selector>
          {currencies.map(option => (
            <WiredRadio
              key={option.value}
              checked={currency === option.value}
              text={option.label}
              onClick={() => handleCurrencyChange(option.value)}
            />
          ))}
        </Selector>
        <Input
          placeholder={inputLabel}
          onChange={handleInputChange}
          value={value}
          variant="filled"
        />
      </InputsRow>
      <span>you have: {pocket[currency]}</span>
    </Block>
  );
};

export default ConvertField;
