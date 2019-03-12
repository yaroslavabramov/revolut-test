import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDialogOpened } from './selectors';
import {
  subscribeRates,
  cancelSubscription,
  exchangeClicked,
  updateDialogOpened,
  clearStore
} from './actions';
import InputsBlock from './InputsBlock';
import ModalDialog from './ModalDialog';
import ButtonsBlock from './ButtonsBlock';

/**
 * UI with converter
 */
const Converter = ({
  handleExchangeClick,
  startSubscribe,
  endSubscribe,
  handleDialogClick,
  clearInputs,
  dialogOpened
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
      <InputsBlock />
      <ButtonsBlock handleExchangeClick={handleExchangeClick} />
      <ModalDialog opened={dialogOpened} handleClick={handleDialogClick} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  dialogOpened: selectDialogOpened
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
