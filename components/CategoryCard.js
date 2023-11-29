import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import {
  IconButton,
  Card, Grid, CardActions, CardContent, Typography, Button,
} from '@mui/material';
import { deleteCateogries } from '../api/categoryData';

export default function CategoryCard({ categoryObj, onUpdate }) {
  const router = useRouter();

  const deleteThisCategory = () => {
    if (window.confirm(`Delete ${categoryObj.name}? ALL RELATED EXPENSES WILL BE DELETED!!`)) {
      deleteCateogries(categoryObj.firebaseKey).then(() => onUpdate());
    }
  };

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
            Spending Limit: ${categoryObj.spendingLimit.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="delete" onClick={deleteThisCategory}>
            <DeleteIcon />
          </IconButton>
          <Button size="small" onClick={() => router.push(`/category/${categoryObj.firebaseKey}`)}>View Details</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    spendingLimit: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
