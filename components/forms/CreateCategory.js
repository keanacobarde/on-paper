import React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import {
  TextField, FormControl, InputLabel, FilledInput, InputAdornment,
} from '@mui/material';

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
        required
      />
      <FormControl halfWidth sx={{ mt: 1 }} variant="filled">
        <InputLabel htmlFor="filled-adornment-amount">Spending Limit</InputLabel>
        <FilledInput
          id="filled-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
    </>
  );
}
