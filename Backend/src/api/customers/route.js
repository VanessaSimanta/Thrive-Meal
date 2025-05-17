const express = require('express');
const router = express.Router();
const {
  createCustomerHandler,
  getAllCustomersHandler,
  getCustomerByIdHandler
} = require('./controller');
const { route } = require('../orders/route');

router.post('/', createCustomerHandler);
router.get('/', getAllCustomersHandler);
router.get('/:id', getCustomerByIdHandler);

module.exports = router;