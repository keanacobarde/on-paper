/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import {
  TextField, MenuItem, Stack, DialogActions, Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getCategories, getCategoryByName } from '../../api/categoryData';
import { createNewExpense, updateExpense } from '../../api/expenseData';

// Required for Initial State Object
const date = new Date();
const monthValue = date.toLocaleDateString('default', { month: 'long' });

// Required for Dropdown Menu
const monthsArray = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const initialState = {
  name: '',
  amount: '',
  month: monthValue,
  category: '',
};

export default function ExpenseForm({ obj }) {
  const router = useRouter();
  const { user } = useAuth();

  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    console.warn(router.pathname.toString() === '/');
    getCategories(user.uid).then(setCategories);
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
    // responsible for the conversion of the string-typed input into a float - for use within summation functionality
      formInput.amount = parseFloat(formInput.amount);
      updateExpense(formInput).then(() => getCategoryByName(formInput.category).then(() => {
        if (router.pathname.toString() === '/timeline') {
          router.push('/');
        } else {
          router.push('/timeline');
        }
      }));
    } else {
      // responsible for the conversion of the string-typed input into a float - for use within summation functionality
      formInput.amount = parseFloat(formInput.amount);
      const payload = { ...formInput, uid: user.uid };
      createNewExpense(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateExpense(patchPayload).then(() => {
          getCategoryByName(formInput.category).then(() => {
            router.push('/timeline');
          });
        });
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
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Expense Name"
          type="text"
          fullWidth
          variant="standard"
          value={formInput.name}
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
        <Stack
          sx={{ mt: 2 }}
          direction="row"
          spacing={2}
        >
          <TextField
            margin="dense"
            id="name"
            type="text"
            name="category"
            fullWidth
            variant="standard"
            label={obj.firebaseKey ? `${obj.category}` : 'Category'}
            value={formInput.category}
            onChange={handleChange}
            select
          >
            {categories.map((category) => <MenuItem key={category.firebaseKey} value={category.name}> {category.name} </MenuItem>)}
          </TextField>
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
        </Stack>
        <DialogActions sx={{ mt: 0.45 }}>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </>
  );
}

ExpenseForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.string,
    month: PropTypes.string,
    category: PropTypes.string,
    userid: PropTypes.string,
  }),
};

ExpenseForm.defaultProps = {
  obj: initialState,
};
