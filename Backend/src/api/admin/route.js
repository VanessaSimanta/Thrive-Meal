const express = require('express');
const router = express.Router();
const { loginAdmin } = require('./controller');

router.post('/login', loginAdmin);

module.exports = router;
