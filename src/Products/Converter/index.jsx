import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDialogOpened, selectTo, selectFrom } from './selectors';
import {
  subscribeRates,
  cancelSubscription,
  exchangeClicked,
  updateDialogOpened,
  clearStore,
  updateValueFromInput,
  updateFieldCurrency
} from './actions';
import ConvertField from './ConvertField';
import ModalDialog from './ModalDialog';
import { Button } from '@material-ui/core';
import { selectPocket } from '../Pocket/selectors';
import { numbericRegexp } from '../../utils/regexps';

/**
 * UI with converter
 */
const Converter = ({
  handleExchangeClick,
  startSubscribe,
  endSubscribe,
  handleDialogClick,
  clearInputs,
  dialogOpened,
  fromData,
  toData,
  handleInputChange,
  handleCurrencyChange,
  pocket
}) => {
  /**
   * manage rates subscription
   */
  useEffect(() => {
    startSubscribe();
    return endSubscribe;
  }, []);
  /**
   * clear data when unmount
   */
  useEffect(() => {
    return clearInputs;
  }, []);

  return (
    <div>
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
      <Link to="/pocket">
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
      <Button variant="contained" color="primary" onClick={handleExchangeClick}>
        exchange
      </Button>
      <ModalDialog opened={dialogOpened} handleClick={handleDialogClick} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  dialogOpened: selectDialogOpened,
  fromData: selectFrom,
  toData: selectTo,
  pocket: selectPocket
});

const mapDispatchToProps = dispatch => ({
  startSubscribe: () => {
    dispatch(subscribeRates());
  },
  endSubscribe: () => {
    dispatch(cancelSubscription());
  },
  handleExchangeClick: () => {
    dispatch(exchangeClicked());
  },
  handleDialogClick: () => {
    dispatch(updateDialogOpened(false));
  },
  clearInputs: () => {
    dispatch(clearStore());
  },
  handleInputChange: (e, field) => {
    const { value } = e.target;
    if (numbericRegexp.test(value)) {
      dispatch(updateValueFromInput(field, value));
    }
  },
  handleCurrencyChange: (e, field) => {
    const { value } = e.target;
    dispatch(updateFieldCurrency(field, value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
