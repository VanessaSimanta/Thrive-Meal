const express = require('express');
const router = express.Router();
const { getDrivers, getDriver, createNewDriver, updateDriverInfo, deleteDriverInfo } = require('./controller');

router.get('/', getDrivers);
router.get('/:driverID', getDriver);
router.post('/', createNewDriver);
router.put('/:driverID', updateDriverInfo);
router.delete('/:driverID', deleteDriverInfo);

module.exports = router;
