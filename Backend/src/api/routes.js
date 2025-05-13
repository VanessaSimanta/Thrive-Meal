const express = require('express');

const menu = require('./menu/route');
const admin = require('./admin/route');
const branch = require('./branch/route');
const driver = require('./driver/route')
module.exports = () => {
  const app = express.Router();

  menu(app);
  app.use('/menu', menu)
  app.use('/admin', admin)
  app.use('/branch', branch)
  app.use('/driver', driver)


  return app;
};
