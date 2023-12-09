import React from 'react';
import { Card, Grid, Typography } from '@mui/material';

export default function Outlook() {
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Typography
          component="h1"
          variant="h2"
          align="left"
          color="text.primary"
          gutterBottom
        >
          Outlook
        </Typography>
      </Grid>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Card sx={{ minWidth: 275 }}>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Test
          </Typography>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Test
          </Typography>
        </Card>
      </Grid>
    </>
  );
}
