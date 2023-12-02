// deleting all expenses associated with a category

import { deleteCateogries, getSingleCategory } from './categoryData';
import { deleteExpense, getExpenses } from './expenseData';

const deletingCategoryAndExpenses = async (firebaseKey, uid, onUpdate) => {
  // getting a category name
  const categoryName = await getSingleCategory(firebaseKey).then((res) => res.name);

  // getting all associated expenses
  const associatedExepenses = await getExpenses(uid).then((res) => res.filter((expense) => expense.category === categoryName));

  // setting an array of promises
  const arrayOfPromises = await associatedExepenses.map((expense) => deleteExpense(expense.firebaseKey));

  // executing promise
  Promise.all(arrayOfPromises).then(deleteCateogries(firebaseKey).then(() => onUpdate()));
};

export default {
  deletingCategoryAndExpenses,
};
