/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../utils/context/authContext';
import { getCategories } from '../api/categoryData';
import { createNewMonthlyIncome, getIncome, updateIncome } from '../api/incomeData';
import CategoryCard from '../components/CategoryCard';
import { getExpenses } from '../api/expenseData';
import Popup from '../components/Popup';
import CategoryForm from '../components/forms/CategoryForm';
import Footer from '../components/Footer';
import ExpenseForm from '../components/forms/ExpenseForm';

// Required for the central header of page
const date = new Date();
const month = date.toLocaleDateString('default', { month: 'long' });
const currYearNotStr = date.getFullYear();
const currYear = String(currYearNotStr);

// Setting Component to Pass as Prop - AddAnExpense and CreateCategory
const createExpenseComponent = <ExpenseForm />;
const createCategoryComponent = <CategoryForm />;

export default function Dashboard() {
  // Necessary Hooks and API Calls for updating

  // Hooks - usAuth, useState
  const { user } = useAuth();

  // Finding necessary user data for rendering purposes
  const checkingAccAge = () => {
    const timeDiff = parseFloat(user.metadata.b) - parseFloat(user.metadata.a);
    if (timeDiff < 2) {
      const monthsArray = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
      monthsArray.forEach((monthInd) => {
        const payload = {
          month: monthInd,
          year: date.toLocaleDateString('default', { year: 'numeric' }),
          earnings: 0,
          uid: user.uid,
        };
        createNewMonthlyIncome(payload).then(({ name }) => {
          const patchPayload = { firebasekey: name };
          updateIncome(patchPayload).then(console.warn);
        });
      });
    }
  };

  const [categories, setCategories] = React.useState([]);
  const [income, setIncome] = React.useState([]);
  const [expenses, setExpenses] = React.useState([]);

  // Required API Calls for displayed data
  const getAllTheCategories = () => {
    getCategories(user.uid).then(setCategories);
  };

  const getMonthlyIncome = () => {
    getIncome(user.uid).then((response) => setIncome(response.filter((monthlyObj) => monthlyObj.month === month && monthlyObj.year === currYear)));
  };

  const getMonthlyExpenses = () => {
    getExpenses(user.uid).then((response) => setExpenses(response.filter((expenseObj) => expenseObj.month === month)));
  };

  // Hooks - useEffect
  React.useEffect(() => {
    getAllTheCategories();
    getMonthlyIncome();
    getMonthlyExpenses();
    checkingAccAge();
  }, []);

  // Math Functionality - sums data called from API to display beneath the month
  const monthlyIncome = income[0]?.earnings;
  const categoryTotal = categories?.reduce((acc, curr) => acc + curr.spendingLimit, 0);
  const expenseTotal = expenses?.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <>
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
              {month}
            </Typography>
            <Stack spacing={2} direction="column" alignItems="center">
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Monthly Earnings:
              </Typography>
              <div className="money-display"> ${monthlyIncome?.toFixed(2)} </div>
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Amount Left to Spend:
              </Typography>
              <div className="money-display"> ${(monthlyIncome - expenseTotal).toFixed(2)} </div>
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Amount Unallocated:
              </Typography>
              <div className="money-display"> ${(monthlyIncome - categoryTotal).toFixed(2)} </div>
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Popup buttonName="Add an Expense" formTitle="Add an Expense" formContent={createExpenseComponent} />
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}
        {/* Start of category unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-between" alignItems="center">
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Categories
            </Typography>
            <Popup buttonName="Add a Category" formTitle="Create a Category" formContent={createCategoryComponent} />
          </Grid>
          <Grid container spacing={4}>
            {categories.length ? categories.map((category) => (
              <CategoryCard key={category.firebaseKey} categoryObj={category} onUpdate={getAllTheCategories} />
            )) : (
              <Typography
                sx={{ mt: 2 }}
                component="h1"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Hmm...no categories found - create some!
              </Typography>
            )}
          </Grid>
        </Container>
        <Footer />
      </main>
    </>
  );
}
