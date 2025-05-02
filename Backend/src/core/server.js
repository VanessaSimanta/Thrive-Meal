const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const config = require('./config');
//const routes = require('../api/routes');
const { errorResponder, errorTypes } = require('./errors');

const app = express();

// Middleware
app.enable('trust proxy');
app.use(cors());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
//app.use(config.api.prefix, routes());

// 404 Handler
app.use((req, res, next) => {
  next(errorResponder(errorTypes.ROUTE_NOT_FOUND, 'Route not found'));
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err); // Log error ke console

  res.status(err.status || 500).json({
    statusCode: err.status || 500,
    error: err.code || 'UNKNOWN_ERROR',
    description: err.description || 'Unknown error',
    message: err.message || 'An error has occurred',
  });
});

module.exports = app;
