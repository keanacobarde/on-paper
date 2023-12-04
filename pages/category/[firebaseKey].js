/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Stack, Grid,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleCategory } from '../../api/categoryData';
import { getExpenses } from '../../api/expenseData';
import ExpenseCard from '../../components/ExpenseCard';
import Popup from '../../components/Popup';
import CategoryForm from '../../components/forms/CategoryForm';
import ExpenseForm from '../../components/forms/ExpenseForm';

// Used as a comparison within .filter functionality
const date = new Date();
const month = date.toLocaleDateString('default', { month: 'long' });

export default function CategoryDetails() {
  // Necessary Hooks and API Calls for updating

  // Hooks - useRouter and useAuth
  const router = useRouter();
  const { user } = useAuth();

  // Obtains fbk for API querying
  const { firebaseKey } = router.query;

  // Hooks - useState
  const [category, setCategory] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // API Calls - used to obtain expenses and filter based on realtime month
  const getMonthlyExpenses = () => {
    getExpenses(user.uid).then((response) => setExpenses(response.filter((expenseObj) => expenseObj.month === month)));
  };

  // Hooks - useEffect
  useEffect(() => {
    getSingleCategory(firebaseKey).then(setCategory);
    getMonthlyExpenses();
  }, []);

  // Filter and summation functionality.
  const monthlyExpenses = expenses?.filter((expense) => category.name === expense.category);

  const monthlyExpensesTotal = monthlyExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Setting Component to Pass as Prop - CreateAnExpense and EditACategory, must be within CategoryDetails scope to access 'category' variable.
  const createExpenseComponent = <ExpenseForm />;
  const editCategoryComponent = <CategoryForm obj={category} />;

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
            <Popup buttonName="Add an Expense" formTitle="Add an Expense" formContent={createExpenseComponent} />
            <Popup buttonName="Edit Category" formTitle="Edit a Category" formContent={editCategoryComponent} />
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">

        {/* End hero unit */}

        {/* Start of expenses card unit */}
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
          {monthlyExpenses.length ? monthlyExpenses.map((card) => (
            <ExpenseCard expenseObj={card} onUpdate={getMonthlyExpenses} key={card.firebaseKey} />
          )) : (
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
          )}
        </Grid>
      </Container>
    </main>
  );
}
