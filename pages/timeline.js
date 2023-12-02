import React, { useEffect, useState } from 'react';
import { Stack, Button, Grid } from '@mui/material';
import { useAuth } from '../utils/context/authContext';
import { getIncome } from '../api/incomeData';
import Month from './income/Month';

export default function Timeline() {
  const date = new Date();
  const currMon = date.toLocaleDateString('default', { month: 'short' });
  const { user } = useAuth();
  const monthsArray = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
  ];
  const [currMonth, setCurrMonth] = useState(currMon);
  const [selectedMon, setSelectedMon] = useState(currMonth);

  const getSelectedMonthlyIncome = () => {
    getIncome(user.uid).then((res) => setSelectedMon(res.filter((mon) => mon.month.includes(currMonth))));
  };

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
