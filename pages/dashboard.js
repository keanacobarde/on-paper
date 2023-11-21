/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useAuth } from '../utils/context/authContext';
import { getCategories } from '../api/categoryData';
import { getIncome } from '../api/incomeData';
import CategoryCard from '../components/CategoryCard';
import { getExpenses } from '../api/expenseData';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/keanacobarde">
        OnPaper
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const date = new Date();
const month = date.toLocaleDateString('default', { month: 'long' });

export default function Dashboard() {
  const { user } = useAuth();

  const [cards, setCards] = React.useState([]);
  const [income, setIncome] = React.useState([]);
  const [expenses, setExpenses] = React.useState([]);

  const getAllTheCategories = () => {
    getCategories(user.uid).then(setCards);
  };

  const getMonthlyIncome = () => {
    getIncome(user.uid).then((response) => setIncome(response.filter((monthlyObj) => monthlyObj.month === month)));
  };

  const getMonthlyExpenses = () => {
    getExpenses(user.uid).then((response) => setExpenses(response.filter((expenseObj) => expenseObj.month === month)));
  };

  React.useEffect(() => {
    getAllTheCategories();
    getMonthlyIncome();
    getMonthlyExpenses();
  }, []);

  return (
    <>
      <CssBaseline />
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
              <div className="money-display"> ${income[0]?.earnings} </div>
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Amount Left to Spend:
              </Typography>
              <div className="money-display"> ${income[0]?.earnings - expenses?.reduce((acc, curr) => acc + curr.amount, 0)} </div>
              <Typography
                component="h1"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Amount Unallocated:
              </Typography>
              <div className="money-display"> ${(income[0]?.earnings - cards?.reduce((acc, curr) => acc + curr.spendingLimit, 0)).toFixed(2)} </div>
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" color="primary" size="large">ADD AN EXPENSE</Button>
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
            {cards.map((card) => (
              <CategoryCard categoryObj={card} onUpdate={getAllTheCategories} />
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          OnPaper
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}
