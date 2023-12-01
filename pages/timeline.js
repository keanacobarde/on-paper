import { Stack, Button, Grid } from '@mui/material';
import React from 'react';

export default function timeline() {
  const monthsArray = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
    'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
  ];

  return (
    <main>
      <Grid align="center">
        <Stack sx={{ mt: 4 }} spacing={2} direction="row" justifyContent="center">
          {monthsArray.map((month) => <Button key={month} variant="contained">{month}</Button>)}
        </Stack>
      </Grid>
    </main>
  );
}
