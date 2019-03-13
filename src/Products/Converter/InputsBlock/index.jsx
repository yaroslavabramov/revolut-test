import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDialogOpened, selectTo, selectFrom } from '../selectors';
import { updateValueFromInput, updateFieldCurrency } from '../actions';
import ConvertField from './ConvertField';
import { selectPocket } from '../../Pocket/selectors';
import { numbericRegexp } from '../../../utils/regexps';
import { Section } from './elements';

/**
 * Block with inputs for converter
 */
const InputsBlock = ({
  fromData,
  toData,
  handleInputChange,
  handleCurrencyChange,
  pocket
}) => {
  return (
    <Section>
      <ConvertField
        data={fromData}
        handleInputChange={e => handleInputChange(e, 'from')}
        handleCurrencyChange={e => handleCurrencyChange(e, 'from')}
        pocket={pocket}
        inputLabel="Convert From"
      />
      <ConvertField
        data={toData}
        handleInputChange={e => handleInputChange(e, 'to')}
        handleCurrencyChange={e => handleCurrencyChange(e, 'to')}
        pocket={pocket}
        inputLabel="Convert To"
      />
    </Section>
  );
};

const mapStateToProps = createStructuredSelector({
  dialogOpened: selectDialogOpened,
  fromData: selectFrom,
  toData: selectTo,
  pocket: selectPocket
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: (e, field) => {
    const { value } = e.target;
    if (numbericRegexp.test(value)) {
      dispatch(updateValueFromInput(field, value));
    }
  },
  handleCurrencyChange: (value, field) => {
    dispatch(updateFieldCurrency(field, value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputsBlock);
