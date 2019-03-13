import React from 'react';
import styled from 'styled-components';

const Text = styled.h1`
  padding: 16px;
  text-align: center;
  font-weight: normal;
`;

const Title = ({ text }) => <Text>{text}</Text>;

export default Title;
