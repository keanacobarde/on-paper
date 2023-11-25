import React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { TextField } from '@mui/material';

export default function CreateCategory() {
  return (
    <>
      <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      />
    </>
  );
}
