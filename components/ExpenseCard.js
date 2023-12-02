import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Card, CardContent, Typography, CardActions, IconButton, Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteExpense } from '../api/expenseData';
import Popup from './Popup';
import Expense from './forms/Expense';

export default function ExpenseCard({ expenseObj, onUpdate }) {
  const deleteThisExpense = () => {
    if (window.confirm(`Delete ${expenseObj.name}?`)) {
      deleteExpense(expenseObj.firebaseKey).then(() => onUpdate());
    }
  };

  // Setting Component to Pass as Prop - Edit an Expense
  const createExpenseComponent = <Expense obj={expenseObj} />;

  return (
    <Grid item xs={8} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="column" spacing={0.5}>
            <Typography gutterBottom variant="h5" component="h2">
              {expenseObj.name}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              {expenseObj.category}
            </Typography>
          </Stack>
          <Typography>
            Amount: ${expenseObj.amount}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="delete" onClick={deleteThisExpense}>
            <DeleteIcon />
          </IconButton>
          <Popup buttonType="edit" formTitle="Edit Expense" formContent={createExpenseComponent} />
        </CardActions>
      </Card>
    </Grid>
  );
}

ExpenseCard.propTypes = {
  expenseObj: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
