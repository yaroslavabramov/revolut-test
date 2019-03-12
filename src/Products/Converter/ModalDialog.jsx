import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogText from '@material-ui/core/DialogContentText';
import { WiredButton } from 'react-wired';

const Title = styled.h2`
  && {
    margin: 0;
    padding: 24px;
    font-weight: normal;
    font-family: 'FallIsComing';
  }
`;
const Text = styled(DialogText)`
  && {
    font-size: 26px;
    font-family: 'FallIsComing';
  }
`;

const ModalDialog = ({ opened, handleClick }) => (
  <div>
    <Dialog
      open={opened}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <Title id="alert-dialog-slide-title">Sorry, bro</Title>
      <DialogContent>
        <Text id="alert-dialog-slide-description">
          You have not enough money
        </Text>
      </DialogContent>
      <DialogActions>
        <WiredButton onClick={handleClick} text="okay :(" />
      </DialogActions>
    </Dialog>
  </div>
);

export default ModalDialog;