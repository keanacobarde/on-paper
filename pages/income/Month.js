/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Container, Typography, Stack, Grid,
} from '@mui/material';
import { getExpenses } from '../../api/expenseData';
import ExpenseCard from '../../components/ExpenseCard';

export default function Month({ obj }) {
  const [expenses, setExpenses] = useState([]);

  const getMonthlyExpenses = () => {
    getExpenses(obj.uid).then((response) => setExpenses(response.filter((expenseObj) => expenseObj.month === obj.month)));
  };

  const monthlyExpensesTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    getMonthlyExpenses();
  }, []);

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
            <div className="money-display"> ${obj.earnings} </div>
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Amount Left to Spend:
            </Typography>
            <div className="money-display"> ${obj.earnings - monthlyExpensesTotal} </div>
          </Stack>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          />
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
        <Grid container spacing={4}>
          {expenses.map((expense) => <ExpenseCard expenseObj={expense} onUpdate={getMonthlyExpenses} key={expense.firebaseKey} />)}
        </Grid>
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
