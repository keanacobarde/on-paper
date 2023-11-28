/* eslint-disable no-var */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import {
  FormControl, Stack, DialogActions, Button, TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { updateCategory, createNewCategory } from '../../api/categoryData';

const initialState = {
  name: '',
  spendingLimit: 0.00,
};

export default function CreateCategoryForm({ obj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // checking if the name value is assigned to the name to determine handling
    if (name === 'name') {
      setFormInput((prevState) => ({
        ...prevState,
        name: value,
      }));
    }

    // checking if the name value is assigned to spendingLimit
    if (name === 'spendingLimit') {
      const parsedSpendingLimit = parseFloat(value) ? parseFloat(value) : 0.00;
      console.warn(parsedSpendingLimit);
      setFormInput((prevState) => ({
        ...prevState,
        spendingLimit: parsedSpendingLimit,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCategory(formInput).then(() => router.push(`/category/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createNewCategory(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCategory(patchPayload).then(() => {
          router.push(`category/${patchPayload.firebaseKey}`);
        });
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <DialogContentText>
            Add a Category. Think about the different expenses in your life. From reocurring bills to things you want to save up for. Just make sure every cent is accounted for.
          </DialogContentText>
          <FormControl variant="filled">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Category Name"
              type="text"
              fullWidth
              variant="standard"
              value={formInput.name}
              onChange={handleChange}
            />
            <TextField
              helperText="Only accepts numbers and decimals."
              margin="dense"
              id="name"
              name="spendingLimit"
              label="Spending Limit"
              fullWidth
              variant="standard"
              value={formInput.spendingLimit}
              onChange={handleChange}
            />
          </FormControl>
        </Stack>
        <DialogActions>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </>
  );
}

CreateCategoryForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    spendingLimit: PropTypes.number,
    userid: PropTypes.string,
  }),
};

CreateCategoryForm.defaultProps = {
  obj: initialState,
};
