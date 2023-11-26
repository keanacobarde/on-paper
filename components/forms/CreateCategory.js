import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import {
  FormControl, InputLabel, FilledInput, InputAdornment, Stack, DialogActions, Button,
} from '@mui/material';

const initialState = {
  name: '',
  spendingLimit: 0.00,
};

export default function CreateCategory({ obj }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {

  };

  return (
    <>
      <Stack spacing={2}>
        <DialogContentText>
          Add a Category. Think about the different expenses in your life. From reocurring bills to things you want to save up for. Just make sure every cent is accounted for.
        </DialogContentText>
        <FormControl variant="filled">
          <InputLabel htmlFor="component-filled">Category Name</InputLabel>
          <FilledInput id="component-filled" name="name" value={formInput.name} onChange={handleChange} />
        </FormControl>
        <FormControl halfWidth sx={{ mt: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Spending Limit</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Stack>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </>
  );
}

CreateCategory.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    spendingLimit: PropTypes.number,
    userid: PropTypes.string,
  }),
};

CreateCategory.defaultProps = {
  obj: initialState,
};
