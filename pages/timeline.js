import React, { useEffect, useState } from 'react';
import { Stack, Button, Grid } from '@mui/material';
import { useAuth } from '../utils/context/authContext';
import { getIncome } from '../api/incomeData';
import Month from './income/Month';

// Necessary to set default month that is being displayed
const date = new Date();
const currMon = date.toLocaleDateString('default', { month: 'short' });

// Necessary for the rendering of the buttons
const monthsArray = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
  'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
];

export default function Timeline() {
  // Necessary Hooks and API Calls for updating
  const { user } = useAuth();

  // Hooks - useState

  // Sets the month that being selected by the user.
  const [currMonth, setCurrMonth] = useState(currMon);

  // Sets the month object that will be passed to the component
  const [selectedMon, setSelectedMon] = useState(currMonth);

  // API Call - obtaining all monthly expenses and filtering based on month
  const getSelectedMonthlyIncome = () => {
    getIncome(user.uid).then((res) => setSelectedMon(res.filter((mon) => mon.month.includes(currMonth))));
  };

  // Hooks - useEffect
  useEffect(() => {
    getSelectedMonthlyIncome();
  });

  return (
    <main>
      <Grid align="center">
        <Stack sx={{ mt: 4 }} spacing={2} direction="row" justifyContent="center">
          {monthsArray.map((month) => <Button key={month} variant="contained" onClick={() => setCurrMonth(month)}>{month}</Button>)}
        </Stack>
      </Grid>
      <Month obj={selectedMon[0]} />
    </main>
  );
}
