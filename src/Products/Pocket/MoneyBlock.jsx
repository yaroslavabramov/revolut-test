import React from 'react';
import PropTypes from 'prop-types';
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

MoneyBlock.propTypes = {
  /**
   * object with values for each currency
   */
  money: PropTypes.shape({
    USD: PropTypes.number.isRequired,
    EUR: PropTypes.number.isRequired,
    GBP: PropTypes.number.isRequired
  }).isRequired
};

const mapStateToProps = createStructuredSelector({
  money: selectPocket
});

export default connect(mapStateToProps)(MoneyBlock);
