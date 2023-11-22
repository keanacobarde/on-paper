import React from 'react';
import {
  Box, Container, Typography, Stack, Button,
} from '@mui/material';

export default function CategoryDetails() {
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
          >
            Test
          </Typography>
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Monthly Earnings:
            </Typography>
            <div className="money-display"> </div>
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
            <Typography
              component="h1"
              variant="h6"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Amount Unallocated:
            </Typography>
            <div className="money-display"> </div>
          </Stack>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" color="primary" size="large">ADD AN EXPENSE</Button>
          </Stack>
        </Container>
      </Box>
    </main>
  );
}
