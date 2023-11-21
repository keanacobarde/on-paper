import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Grid, CardActions, CardContent, Typography, Button,
} from '@mui/material';

export default function CategoryCard({ categoryObj }) {
  return (
    <Grid item xs={8} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {categoryObj.name}
          </Typography>
          <Typography>
            {categoryObj.spendingLimit}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    spendingLimit: PropTypes.number.isRequired,
  }).isRequired,
};
