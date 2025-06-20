const express = require('express');
const router = express.Router();
const { getDrivers, getDriverCtrl, createNewDriver, updateDriverInfo, deleteDriverInfo } = require('./controller');

router.get('/', getDrivers);
router.get('/pagination', getDriverCtrl);
router.post('/', createNewDriver);
router.put('/:driverID', updateDriverInfo);
router.delete('/:driverID', deleteDriverInfo);

module.exports = router;
