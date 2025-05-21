const express = require('express');
const router = express.Router();
const {
  getAllOrdersCtrl,
  getOrderByIdCtrl,
  createOrderCtrl,
  updateOrderCtrl,
  deleteOrderCtrl,
  createFullOrderCtrl,
  assignBranchCtrl,
  assignDriverCtrl
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

// put driver and branch to order
router.put('/assign-branch/:orderId', assignBranchCtrl);
router.put('/assign-driver/:orderId', assignDriverCtrl);

module.exports = router;
