const express = require('express');
const { loginAdmin, changePassword } = require('./controller');
const authenticateToken = require('./authMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);
router.put('/change-password', authenticateToken, changePassword);

module.exports = router;
