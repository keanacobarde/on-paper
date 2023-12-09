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
      <Grid container item xs={8} sx={{ mt: 2 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
