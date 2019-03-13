import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import { selectFromCurr, selectToCurr, selectCoef } from './selectors';
import { currencySigns } from './constants';
import { round } from '../../utils/math';

const Wrapper = styled.div`
  padding: 16px;
`;

const RateBlock = ({ fromCurrency, toCurrency, rate }) => (
  <Wrapper>
    {`1${currencySigns[fromCurrency]} = ${round(rate)}${
      currencySigns[toCurrency]
    }`}
  </Wrapper>
);

RateBlock.propTypes = {
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
  rates: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  fromCurrency: selectFromCurr,
  toCurrency: selectToCurr,
  rate: selectCoef
});

export default connect(mapStateToProps)(RateBlock);
