import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectRates } from './selectors';
import { subscribeRates, cancelSubscription } from './actions';
import ConvertFrom from './ConvertFrom';
import ConvertTo from './ConvertTo';

/**
 * UI with converter
 */
const Converter = ({ rates, startSubscribe, endSubscribe }) => {
  /**
   * manage rates subscription
   */
  useEffect(() => {
    startSubscribe();
    return endSubscribe;
  }, []);

  return (
    <div>
      <Link to="/pocket">GO TO POCKET</Link>
      Hello world! here is your rates:
      <br />
      {rates.USD}
      <br />
      {rates.EUR}
      <br />
      {rates.GBP}
      <br />
      <ConvertFrom />
      <ConvertTo />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  rates: selectRates
});

const mapDispatchToProps = dispatch => ({
  startSubscribe: () => {
    dispatch(subscribeRates());
  },
  endSubscribe: () => {
    dispatch(cancelSubscription());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
