import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDialogOpened } from './selectors';
import {
  subscribeRates,
  cancelSubscription,
  exchangeClicked,
  updateDialogOpened
} from './actions';
import ConvertFrom from './ConvertFrom';
import ConvertTo from './ConvertTo';
import ModalDialog from './ModalDialog';
import { Button } from '@material-ui/core';

/**
 * UI with converter
 */
const Converter = ({
  handleExchange,
  startSubscribe,
  endSubscribe,
  handleDialogClick,
  dialogOpened
}) => {
  /**
   * manage rates subscription
   */
  useEffect(() => {
    startSubscribe();
    return endSubscribe;
  }, []);

  return (
    <div>
      <ConvertFrom />
      <ConvertTo />
      <Link to="/pocket">
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
      <Button variant="contained" color="primary" onClick={handleExchange}>
        exchange
      </Button>
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
  handleExchange: () => {
    dispatch(exchangeClicked());
  },
  handleDialogClick: () => {
    dispatch(updateDialogOpened(false));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
