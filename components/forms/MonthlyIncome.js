/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import {
  TextField, DialogActions, Button, MenuItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import { createNewMonthlyIncome, updateIncome } from '../../api/incomeData';
import { useAuth } from '../../utils/context/authContext';

// Required for InitialState Object
const date = new Date();
const currYear = date.toLocaleDateString('default', { year: 'numeric' });

// Required for Dropdown Menu
const monthsArray = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Required for Dropdown Menu
const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];

const initialState = {
  earnings: '',
  month: '',
  year: currYear,
};

export default function MonthlyIncome({ obj }) {
  const router = useRouter();
  const { user } = useAuth();

  const [formInput, setFormInput] = useState(initialState);

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
      // responsible for the conversion of the string-typed input into a float - for use within summation functionality
      formInput.earnings = parseFloat(formInput.earnings);
      updateIncome(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createNewMonthlyIncome(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContentText>
          Add an Expense. This can be anything - from gas money to utility bills to monthly subscriptions. Just make sure you have enough money alloted within your categories for it!
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          type="text"
          name="month"
          fullWidth
          variant="standard"
          label="Month"
          value={formInput.month}
          onChange={handleChange}
          select
        >
          {monthsArray.map((month) => (
            <MenuItem key={month} value={month}> {month}
            </MenuItem>
          ))}
        </TextField>
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
        <TextField
          margin="dense"
          id="name"
          type="text"
          name="year"
          fullWidth
          variant="standard"
          label="Year"
          value={formInput.year}
          onChange={handleChange}
          select
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}> {year}
            </MenuItem>
          ))}
        </TextField>
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
