/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Card, Grid, Typography, CardContent,
} from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { getCategories } from '../api/categoryData';
import { useAuth } from '../utils/context/authContext';

export default function Outlook() {
  // Obtain Data for Doughnut Chart - establish necessary hooks
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  const getAllTheCateogries = () => {
    getCategories(user.uid).then(setCategories);
  };

  useEffect(() => {
    getAllTheCateogries();
    console.warn(categories);
  }, []);

  const categoryData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: 'Spending Limit',
        data: categories.map((category) => category.spendingLimit),
      },
    ],
  };

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
            <Doughnut data={categoryData} />
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
