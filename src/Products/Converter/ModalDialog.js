import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';

const ModalDialog = ({ opened, handleClick }) => (
  <div>
    <Dialog
      open={opened}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Sorry, bro</DialogTitle>
      <DialogContent>
        <DialogText id="alert-dialog-slide-description">
          You have not enough money
        </DialogText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary">
          okay :(
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default ModalDialog;
