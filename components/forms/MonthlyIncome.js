import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import {
  TextField, DialogActions, Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import { updateIncome } from '../../api/incomeData';

const initialState = {
  earnings: '',
  month: '',
  year: '',
};

export default function MonthlyIncome({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, []);

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
      formInput.earnings = parseFloat(formInput.earnings);
      updateIncome(formInput).then(() => router.push('/'));
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
          name="month"
          label="Month"
          type="text"
          fullWidth
          variant="standard"
          value={formInput.month}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          name="earnings"
          label="Income"
          type="text"
          fullWidth
          variant="standard"
          value={formInput.earnings}
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
