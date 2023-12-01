import React, { useState } from 'react';
import { Stack, Button, Grid } from '@mui/material';

export default function Timeline() {
  const date = new Date();
  const currMon = date.toLocaleDateString('default', { month: 'long' });

  const monthsArray = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
    'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
  ];

  const [currMonth, setCurrMonth] = useState(currMon);

  console.warn(currMonth);

  return (
    <main>
      <Grid align="center">
        <Stack sx={{ mt: 4 }} spacing={2} direction="row" justifyContent="center">
          {monthsArray.map((month) => <Button key={month} variant="contained" onClick={() => setCurrMonth(month)}>{month}</Button>)}
        </Stack>
      </Grid>
    </main>
  );
}
