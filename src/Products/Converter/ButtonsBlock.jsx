import React from 'react';
import { Link } from 'react-router-dom';
import { WiredButton } from 'react-wired';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
`;

const ButtonsBlock = ({ handleExchangeClick }) => (
  <Wrapper>
    <Link to="/pocket">
      <WiredButton text="Back" />
    </Link>
    <WiredButton text="Exchange" onClick={handleExchangeClick} />
  </Wrapper>
);

export default ButtonsBlock;
