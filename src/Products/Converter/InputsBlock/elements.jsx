import styled from 'styled-components';
import { WiredInput } from 'react-wired';

const Section = styled.section`
  padding: 16px;
`;

const InputsRow = styled.div`
  display: flex;
`;

const Selector = styled.div`
  && {
    margin-right: 16px;
  }
`;
const Block = styled.div`
  && {
    margin-top: 16px;
  }
`;

const Input = styled(WiredInput)`
  && {
    font-family: 'FallIsComing';
    height: 100%;
  }
`;

export { Section, InputsRow, Selector, Input, Block };
