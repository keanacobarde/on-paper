import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import {
  TextField, MenuItem, Stack,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  amount: '',
  month: '',
  category: '',
};

export default function Expense({ obj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  console.warn(user, router.query, formInput);

  return (
    <>
      <form>
        <DialogContentText>
          Add an Expense. This can be anything - from gas money to utility bills to monthly subscriptions. Just make sure you have enough money alloted within your categories for it!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Expense Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="name"
          label="Amount"
          type="text"
          fullWidth
          variant="standard"
        />
        <Stack>
          <TextField
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            label="Select Category"
            select
          >
            <MenuItem value=""> Category </MenuItem>
            <MenuItem value=""> Category </MenuItem>
            <MenuItem value=""> Category </MenuItem>
          </TextField>
        </Stack>
      </form>
    </>
  );
}

Expense.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.string,
    month: PropTypes.string,
    categeory: PropTypes.string,
    userid: PropTypes.string,
  }),
};

Expense.defaultProps = {
  obj: initialState,
};
