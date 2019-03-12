import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { selectFromCurr, selectToCurr, selectCoef } from './selectors';
import { currencySigns } from './constants';

const Wrapper = styled.div`
  padding: 16px;
`;

const RateBlock = ({ fromCurrency, toCurrency, rate }) => (
  <Wrapper>
    {`1${currencySigns[fromCurrency]} = ${rate}${currencySigns[toCurrency]}`}
  </Wrapper>
);

const mapStateToProps = createStructuredSelector({
  fromCurrency: selectFromCurr,
  toCurrency: selectToCurr,
  rate: selectCoef
});

export default connect(mapStateToProps)(RateBlock);
