require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan('dev'));
app.use(cors());

const port = process.env.PORT || 4001,
  dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true
}, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to db');
  }
});

app.use('/api', routes.main);
app.use('/api/accounts', routes.account);
app.use('/api/seller', routes.seller);
app.use('/api/search', routes.search);
app.use('/api/categories', routes.categories);
app.use('/api/review', routes.review);
app.use('/api/payment', routes.payment);

// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

app.listen(port, () => console.log(`Server started on port ${port}`));