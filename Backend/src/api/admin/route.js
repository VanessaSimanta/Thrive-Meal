const express = require('express');
const router = express.Router();
const { loginAdmin, changePassword } = require('./controller');

router.post('/login', loginAdmin);
router.post('/change-password', changePassword);

module.exports = router;
