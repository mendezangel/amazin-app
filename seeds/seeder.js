// const fetch = require('node-fetch');
import fetch from 'node-fetch'

// fetch('https://fakestoreapi.com/products')
//   .then(res => res.json())
//   .then(json => console.log(json))

fetch('https://dummyjson.com/products?limit=100')
  .then(res => res.json())
  .then(console.log);

// fetch('https://dummyproducts-api.herokuapp.com/api/v1/products')
//   .then(res => res.json())
//   .then(json => console.log(json))

// node --experimental-modules seeder.js