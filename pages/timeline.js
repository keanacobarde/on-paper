import { Stack, Button } from '@mui/material';
import React from 'react';

export default function timeline() {
  const monthsArray = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
    'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
  ];

  return (
    <main>
      <Stack sx={{ mt: 4 }} spacing={2} direction="row">
        {monthsArray.map((month) => <Button key={month} variant="contained">{month}</Button>)}
      </Stack>
    </main>
  );
}
