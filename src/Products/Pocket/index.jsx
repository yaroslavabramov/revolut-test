import React from 'react';
import { connect } from 'react-redux';
import MoneyBlock from './MoneyBlock';
import Title from '../../Components/Title';
import ButtonsBlock from './ButtonsBlock';

/**
 * first page of application
 */
const Pocket = () => {
  return (
    <>
      <Title text="My fancy pocket" />
      <MoneyBlock />
      <ButtonsBlock />
    </>
  );
};

export default connect()(Pocket);
