/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Card, Grid, Typography, CardContent,
} from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Colors } from 'chart.js';
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
  }, []);

  // Setting necessary values for Chart.JS functionality

  // Registering color variables
  ChartJS.register(Colors);

  const colorOptions = {
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
  };

  // Data for Category Doughnut
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
      <Grid container xs="auto" sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={8} sm={6}>
          <Card item sx={{ minWidth: 275 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Monthly Earnings
              </Typography>
              <Doughnut data={categoryData} options={colorOptions} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={6}>
          <Card item sx={{ minWidth: 275 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Monthly Earnings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
