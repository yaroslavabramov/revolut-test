import React from 'react';
import { Link } from 'react-router-dom';
import { WiredButton } from 'react-wired';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
`;

const ButtonsBlock = () => (
  <Wrapper>
    <Link to="/converter">
      <WiredButton text="Exchange" />
    </Link>
  </Wrapper>
);

export default ButtonsBlock;
