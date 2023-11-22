import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// CREATE - POST
const createNewExpense = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/expense.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// READ
const getExpenses = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/expense.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// UPDATE - PATCH
const updateExpense = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/expense/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE
const deleteExpense = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/expense/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE EXPENSE
const getSingleExpense = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/expense/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createNewExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getSingleExpense,
};
