import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// CREATE - POST
const createNewMonthlyIncome = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/income.json`, {
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
const getIncome = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/income.json?orderBy="uid"&equalTo="${uid}"`, {
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
const updateIncome = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/income/${payload.firebaseKey}.json`, {
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

const getSingleIncome = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/income/${firebaseKey}.json`, {
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
  createNewMonthlyIncome,
  getIncome,
  updateIncome,
  getSingleIncome,
};
