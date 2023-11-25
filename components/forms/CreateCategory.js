import React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { TextField } from '@mui/material';

export default function CreateCategory() {
  return (
    <>
      <DialogContentText>
        Add a Category. Think about the different expenses in your life. From reocurring bills to things you want to save up for. Just make sure every cent is accounted for.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Category Name"
        type="string"
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        id="spendingLimit"
        label="Spending Limit"
        type="float"
        fullWidth
        variant="standard"
      />
    </>
  );
}
