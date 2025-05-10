const express = require('express');

const menu = require('./menu/route');
const admin = require('./admin/route')
module.exports = () => {
  const app = express.Router();

  menu(app);
  app.use('/admin', admin)

  return app;
};
