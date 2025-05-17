const express = require('express');
const router = express.Router();
const {
  getAllOrdersCtrl,
  getOrderByIdCtrl,
  createOrderCtrl,
  updateOrderCtrl,
  deleteOrderCtrl,
  createFullOrderCtrl
} = require('./controller');

// GET all orders
router.get('/', getAllOrdersCtrl);

// GET order by ID
router.get('/:orderId', getOrderByIdCtrl);

// POST create new order
router.post('/', createOrderCtrl);
router.put('/:orderId', updateOrderCtrl);
router.delete('/:orderId', deleteOrderCtrl);

router.post('/full', createFullOrderCtrl);

module.exports = router;
