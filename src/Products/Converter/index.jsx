import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRates } from './selectors';

/**
 *
 */
const Converter = ({ rates }) => {
  return (
    <>
      Hello world! here is your rates:
      {rates}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  rates: selectRates
});

export default connect(mapStateToProps)(Converter);
