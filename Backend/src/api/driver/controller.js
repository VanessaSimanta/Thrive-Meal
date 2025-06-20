  const { getAllDrivers, getDriver, createDriver, updateDriver, deleteDriver } = require('./repository');
  const { errorResponder, errorTypes } = require('../../core/errors');

  const getDrivers = async (req, res) => {
    try {
      const drivers = await getAllDrivers();
      return res.status(200).json(drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getDriverCtrl = async (req, res) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { data, total } = await getDriver(limit, offset);
    const lastPage = Math.ceil(total / limit);

    res.status(200).json({
      data,
      currentPage: page,
      lastPage,
      totalPages: lastPage,
      totalData: total,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json(errorResponder(errorTypes.NOT_FOUND));
  }
  };

  const createNewDriver = async (req, res) => {
    const driverData = req.body;
    try {
      const newDriver = await createDriver(driverData);
      return res.status(201).json(newDriver);
    } catch (error) {
      console.error('Error creating driver:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const updateDriverInfo = async (req, res) => {
    const { driverID } = req.params;
    const driverData = req.body;
    try {
      const updatedDriver = await updateDriver(driverID, driverData);
      if (!updatedDriver.length) {
        return res.status(404).json({ message: 'Driver not found' });
      }
      return res.status(200).json(updatedDriver);
    } catch (error) {
      console.error('Error updating driver:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const deleteDriverInfo = async (req, res) => {
    const { driverID } = req.params;
    try {
      const rowsDeleted = await deleteDriver(driverID);
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: 'Driver not found' });
      }
      return res.status(200).json({ message: 'Driver deleted successfully' });
    } catch (error) {
      console.error('Error deleting driver:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {
    getDrivers,
    getDriverCtrl,
    createNewDriver,
    updateDriverInfo,
    deleteDriverInfo
  };
