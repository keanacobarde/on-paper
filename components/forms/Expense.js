import React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { TextField } from '@mui/material';

export default function Expense() {
  return (
    <>
      <DialogContentText>
        Add an Expense. This can be anything - from gas money to utility bills to monthly subscriptions. Just make sure you have enough money alloted within your categories for it!
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
