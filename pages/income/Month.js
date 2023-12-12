/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Container, Typography, Stack, Grid,
} from '@mui/material';
import { getExpenses } from '../../api/expenseData';
import ExpenseCard from '../../components/ExpenseCard';
import MonthlyInome from '../../components/forms/MonthlyIncome';
import Popup from '../../components/Popup';
import Outlook from '../../components/Outlook';

export default function Month({ obj }) {
  // Necessary Hooks and API Calls for updating

  // Hooks - useState
  const [expenses, setExpenses] = useState([]);

  // API Call - obtaining all monthly expenses and filtering based on month
  const getMonthlyExpenses = () => {
    getExpenses(obj.uid).then((res) => setExpenses(res.filter((expense) => expense.month === obj.month)));
  };

  // Hooks - useEffect
  useEffect(() => {
    getMonthlyExpenses();
  }, [obj.month]);

  // Math Functionality - sums data called from API to display beneath the month
  const monthlyExpensesTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Setting Component to Pass as Prop - Create and Edit a monthly income, must be within CategoryDetails scope to access 'obj' prop.
  const createMonthlyIncome = <MonthlyInome />;
  const editMonthlyIncome = <MonthlyInome obj={obj} />;

  return (
    <>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {obj.month}
          </Typography>
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Spending Limit
            </Typography>
            <div className="money-display"> ${obj.earnings?.toFixed(2)} </div>
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Amount Left to Spend:
            </Typography>
            <div className="money-display"> ${(obj.earnings - monthlyExpensesTotal).toFixed(2)} </div>
          </Stack>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Popup buttonName="Add Next Month" formTitle="Add a Month" formContent={createMonthlyIncome} />
            <Popup buttonName="Edit Month" formTitle="Edit a Month" formContent={editMonthlyIncome} />
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">

        {/* End hero unit */}

        {/* Start of expense unit */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Typography
            component="h1"
            variant="h2"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Expenses
          </Typography>
        </Grid>
        <Grid container spacing={4} sx={{ mb: 5 }}>
          {expenses.length ? expenses.map((expense) => <ExpenseCard expenseObj={expense} onUpdate={getMonthlyExpenses} key={expense.firebaseKey} />) : (
            <Typography
              sx={{ mt: 2 }}
              component="h1"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Hmm...no expenses found - create some!
            </Typography>
          ) }
        </Grid>
        <Outlook monthlyEarnings={obj.earnings} totalExpenses={monthlyExpensesTotal} allExpenses={expenses} />
      </Container>
    </>
  );
}

Month.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    earnings: PropTypes.string,
    month: PropTypes.string,
    uid: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
};
