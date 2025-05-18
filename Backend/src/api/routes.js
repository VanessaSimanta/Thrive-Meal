const express = require('express');

const menu = require('./menu/route');
const admin = require('./admin/route');
const branch = require('./branch/route');
const driver = require('./driver/route');
const orders = require('./orders/route');
const customers = require('./customers/route');
const payment = require('./payment/route');
module.exports = () => {
  const app = express.Router();

  menu(app);
  payment(app);
  app.use('/admin', admin)
  app.use('/branch', branch)
  app.use('/driver',driver)
  app.use('/orders', orders)
  app.use('/customers', customers)


  return app;
};
