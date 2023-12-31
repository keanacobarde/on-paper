import React from 'react';
import {
  Typography, Box, Stack, IconButton, Link,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

// Component referenced ONLY within footer - doesn't need to be exported, as it is not referenced anywhere else.
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/keanacobarde">
        OnPaper
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          OnPaper
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Find us!
        </Typography>
        <Stack direction="row" justifyContent="center">
          <IconButton href="https://www.linkedin.com/in/keana-cobarde">
            <LinkedInIcon />
          </IconButton>
          <IconButton href="https://github.com/keanacobarde">
            <GitHubIcon />
          </IconButton>
        </Stack>
        <Copyright />
      </Box>
    </>

  );
}
