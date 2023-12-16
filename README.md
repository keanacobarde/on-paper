# OnPaper [![Netlify Status](https://api.netlify.com/api/v1/badges/0a1d8099-ac63-4f29-84f0-c4f2225482e8/deploy-status)]()

Do want to save money? Do you want to gain more awareness of where you're spending your money and how? More than anything, do you want it to be at your fingertips? 

Look no further, OnPaper has you covered.

[View App](#https://hiphoppizzaandwangspos.netlify.app/)

## Get Started 
Dependencies: 
- Material UI
- Chart JS

Clone this repo and submit the following command: 

```
npm install 
```
This installs all the packages associated with the template: Next JS and others. 

Material UI: 
```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```
Chart JS: 
```
npm install chart.js react-chartjs-2
```

## About the User 
You're a busy person. You have deadlines to meet and trains to catch. You're a student. You're a teacher. You're a doctor. You're a librarian. You're a parent. Maybe you have no idea where your money goes. Maybe you already have a good idea what your budge looks like. No matter what you are, you're looking to get a better handle on your money.

## Features 
OnPaper has three central components:
- Reporting of monthly earnings
- Creation of custom categories with spending limits, in which your monthly earnings can be divided amongst
- Reporting of expenses that can be categorized 

Also includes: 
- A visual representation of the allocation of your monthly earnings, juxtaposed with your expenses, and what categories they belong within.

CRUD: Create, Read, and Update
- Partial CRUD on monthlyIncome entity, as depcited within the ERD.
- Full CRUD on categories entity.
- Full CRUD on expense entity.
- Various implementations of array methods such as .reduce(), .filter().
- Usage of third-party UI library.
- Usage of third-party data visualization library.  

## LOOMS
*Click below to see OnPaper in action!*


## Relevant Links
- [Check out the deployed site](#)
- [Wireframes](#https://www.figma.com/file/JR4j0Iu2gdUDLbuTe0dU1U/OnPaper---Wireframe---Keana-Cobarde?type=design&node-id=0%3A1&mode=design&t=MPeP58xt6PYIbmwz-1)
- [Project Board](#https://github.com/users/keanacobarde/projects/9/views/1)
- [Check out our technical flow!](#https://github.com/keanacobarde/on-paper/issues/4#issuecomment-1801091901)
- [ERD? Sounds good to me!](#https://dbdiagram.io/d/OnPaper-654807b27d8bbd646587a975)

## Code Snippet

Graph JS - Displaying Expenses
```
// Data for Expenses
  const categoryExpenseArray = categories.map((category) => allExpenses.reduce(((acc, curr) => (category.name === curr.category ? acc + curr.amount : acc + 0)), 0));

  const categoryExpenseData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: 'Amount Spent',
        data: categoryExpenseArray,
      },
    ],
  };
```


## Project Screenshots <!-- These can be inside of your project. Look at the repos from class and see how the images are included in the readme -->
<img width="auto" alt="Your Alt" src="your-link.png">


## Powered By: 
- React.js
- Next.js
- Material UI
- Chart.js

## Contributors
- [Keana Cobarde](https://github.com/keanacobarde)
