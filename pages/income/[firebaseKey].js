import React from 'react';
import {
  Box, Container, Typography, Stack, Grid,
} from '@mui/material';

export default function Timeline() {
  return (
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
          />
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Spending Limit
            </Typography>
            <div className="money-display" />
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Amount Left to Spend:
            </Typography>
            <div className="money-display"> </div>
          </Stack>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          />
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">

        {/* End hero unit */}

        {/* Start of category unit */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Typography
            component="h1"
            variant="h2"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Expenses
          </Typography>
        </Grid>
        <Grid container spacing={4} />
      </Container>
    </main>
  );
}
