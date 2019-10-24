let express = require('express');
let logger = require('morgan');
let fetch = require('node-fetch');

let app = express();

app.use(logger('dev'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Expose-Headers', 'Location');
  next();
});

app.get('/', (req, res) => {
  let lat = req.query.lat;
  let lng = req.query.lng;
  let cat = req.query.cat;
  let term = req.query.term;

  let url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&categories=${cat}&term=${term}`;
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'bearer ...',
    'Accept': 'application/json'
  };

  fetch(url,{
    method: 'GET',
    headers: headers
  }).then(res => {
    return res.ok ? res.json() : Promise.reject(res);
  }).then(json => {
    return res.json(json);
  }).catch(err => {
    return res.json({
      status: err.status,
      statusText: err.statusText
    });
  });
});


module.exports = app;
