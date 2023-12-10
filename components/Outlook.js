import React from 'react';
import {
  Card, Grid, Typography, CardContent,
} from '@mui/material';

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
      <Grid container xs="auto" sx={{ mt: 2 }}>
        <Card item sx={{ minWidth: 275 }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Monthly Earnings
            </Typography>
          </CardContent>
        </Card>
        <Card item sx={{ minWidth: 275 }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Monthly Earnings
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
