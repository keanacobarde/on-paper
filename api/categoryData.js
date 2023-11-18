import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// CREATE - POST
const createNewCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/category.json`, {
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
const getCategories = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/category.json?orderBy="uid"&equalTo="${uid}"`, {
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
const updateCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/category/${payload.firebaseKey}.json`, {
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
const deleteCateogries = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/category/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE MEMBER
const getSingleCategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/category/${firebaseKey}.json`, {
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
  createNewCategory,
  getCategories,
  deleteCateogries,
  updateCategory,
  getSingleCategory,
};
