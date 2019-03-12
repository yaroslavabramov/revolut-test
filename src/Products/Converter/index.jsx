import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDialogOpened, selectLoading } from './selectors';
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
import RateBlock from './RateBlock';
import Title from '../../Components/Title';

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
  loading
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
    <>
      <Title text="Converter" />
      {!loading && (
        <>
          <RateBlock />
          <InputsBlock />
        </>
      )}
      {loading && 'Loading fresh rates...'}
      <ButtonsBlock handleExchangeClick={handleExchangeClick} />
      <ModalDialog opened={dialogOpened} handleClick={handleDialogClick} />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  dialogOpened: selectDialogOpened,
  loading: selectLoading
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
