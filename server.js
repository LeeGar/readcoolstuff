require('dotenv').config();
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const searchController = require('./server/search/searchController.js')

const app = express();
const compiler = webpack(config);

// WEBPACK MIDDLEWARE
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// EXPRESS MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src'));

//Connect Mongoose ORM to server
mongoose.connect('mongodb://localhost/news');

// EXPRESS SERVER ROUTING
app.get('/request-token', searchController.getRequest);
app.get('/return', searchController.getAccess);

app.post('/api/getstories', searchController.getData);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});

