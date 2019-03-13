import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import { selectPocket } from './selectors';

const Wrapper = styled.div`
  padding: 16px;
`;

const MoneyBlock = ({ money: { USD, EUR, GBP } }) => (
  <Wrapper>
    You have:
    <div>USD: {USD}$</div>
    <div>EUR: {EUR}€</div>
    <div>GPB: {GBP}£</div>
  </Wrapper>
);

const mapStateToProps = createStructuredSelector({
  money: selectPocket
});

export default connect(mapStateToProps)(MoneyBlock);
