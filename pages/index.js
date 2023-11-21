/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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

  const getAllTheCategories = () => {
    getCategories(user.uid).then(setCards);
  };

  const getMonthlyIncome = () => {
    getIncome(user.uid).then((response) => setIncome(response.filter((monthlyObj) => monthlyObj.month === month)));
  };

  React.useEffect(() => {
    getAllTheCategories();
    getMonthlyIncome();
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
                Current Amount:
              </Typography>
              <div className="money-display"> Test </div>
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
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={8} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.spendingLimit}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
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
