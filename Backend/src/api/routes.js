const express = require('express');

const menu = require('./menu/route');
module.exports = () => {
  const app = express.Router();

  menu(app);

  return app;
};
