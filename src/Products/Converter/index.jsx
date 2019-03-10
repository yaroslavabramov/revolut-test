import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRates } from './selectors';
import { subscribeData, cancelSubscribe } from './actions';

/**
 *
 */
const Converter = ({ rates, startSubscribe, endSubscribe }) => {
  /**
   * managing subscribe for rates
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  rates: selectRates
});
const mapDispatchToProps = dispatch => ({
  startSubscribe: () => {
    console.log('start');
    dispatch(subscribeData());
  },
  endSubscribe: () => {
    dispatch(cancelSubscribe());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
