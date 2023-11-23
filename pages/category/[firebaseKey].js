/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Stack, Button, Grid,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleCategory } from '../../api/categoryData';
import { getExpenses } from '../../api/expenseData';
import ExpenseCard from '../../components/ExpenseCard';

export default function CategoryDetails() {
  const router = useRouter();
  const { user } = useAuth();
  const date = new Date();
  const month = date.toLocaleDateString('default', { month: 'long' });
  const { firebaseKey } = router.query;

  const [category, setCategory] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const getMonthlyExpenses = () => {
    getExpenses(user.uid).then((response) => setExpenses(response.filter((expenseObj) => expenseObj.month === month)));
  };

  useEffect(() => {
    getSingleCategory(firebaseKey).then(setCategory);
    getMonthlyExpenses();
  }, []);

  const monthlyExpenses = expenses?.filter((expense) => category.name === expense.category);

  const monthlyExpensesTotal = monthlyExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <main>
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
            {category.name}
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
            <div className="money-display"> ${category.spendingLimit} </div>
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Amount Left to Spend:
            </Typography>
            <div className="money-display"> ${category.spendingLimit - monthlyExpensesTotal} </div>
          </Stack>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" color="primary" size="large">ADD AN EXPENSE</Button>
            <Button variant="contained" color="primary" size="large">Edit Category</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">

        {/* End hero unit */}

        {/* Start of category unit */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Typography
            component="h1"
            variant="h2"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Categories
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          {monthlyExpenses.map((card) => (
            <ExpenseCard expenseObj={card} onUpdate={getMonthlyExpenses} />
          ))}
        </Grid>
      </Container>
    </main>
  );
}
