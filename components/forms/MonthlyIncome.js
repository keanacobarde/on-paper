import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import {
  TextField, DialogActions, Button,
} from '@mui/material';

const initialState = {
  earnings: '',
  month: '',
  year: '',
};

export default function MonthlyIncome({ obj }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      console.warn(obj);
    } else {
      console.warn('oof');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContentText>
          Add an Expense. This can be anything - from gas money to utility bills to monthly subscriptions. Just make sure you have enough money alloted within your categories for it!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Expense Name"
          type="text"
          fullWidth
          variant="standard"
          value={formInput.month}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          name="amount"
          label="Amount"
          type="text"
          fullWidth
          variant="standard"
          value={formInput.amount}
          onChange={handleChange}
        />
        <DialogActions sx={{ mt: 0.45 }}>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </>
  );
}

MonthlyIncome.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    earnings: PropTypes.string,
    month: PropTypes.string,
    uid: PropTypes.string,
    year: PropTypes.string,
  }),
};

MonthlyIncome.defaultProps = {
  obj: initialState,
};
