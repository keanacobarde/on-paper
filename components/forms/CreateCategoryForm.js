import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import {
  FormControl, InputLabel, FilledInput, InputAdornment, Stack, DialogActions, Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { updateCategory, createNewCategory } from '../../api/categoryData';

const initialState = {
  name: '',
  spendingLimit: '',
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
    if (name === 'spendingLimit') { Number(value); }
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (obj.firebaseKey) {
      updateCategory(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createNewCategory(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCategory(patchPayload).then(() => router.push('/'));
      });
    }
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
        <FormControl sx={{ mt: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Spending Limit</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            name="spendingLimit"
            value={formInput.spendingLimit}
          />
        </FormControl>
      </Stack>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
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
