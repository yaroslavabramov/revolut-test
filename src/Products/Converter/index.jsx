import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
  clearData,
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
    return clearData;
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

Converter.propTypes = {
  /** handler for exchange button */
  handleExchangeClick: PropTypes.func.isRequired,
  /** start rate`s subscription  */
  startSubscribe: PropTypes.func.isRequired,
  /** end rate`s subscription */
  endSubscribe: PropTypes.func.isRequired,
  /** handler for dialog close button click */
  handleDialogClick: PropTypes.func.isRequired,
  /** clear data in store */
  clearData: PropTypes.func.isRequired,
  /** dialog opened state */
  dialogOpened: PropTypes.bool.isRequired,
  /** true if rates not loaded */
  loading: PropTypes.bool.isRequired
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
  clearData: () => {
    dispatch(clearStore());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
