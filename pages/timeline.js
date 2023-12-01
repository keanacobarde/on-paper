import { Stack, Button } from '@mui/material';
import React from 'react';

export default function timeline() {
  const monthsArray = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
    'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
  ];

  return (
    <Stack sx={{ mt: 4 }} spacing={2} direction="row">
      {monthsArray.map((month) => <Button variant="outlined">{month}</Button>)}
    </Stack>
  );
}
