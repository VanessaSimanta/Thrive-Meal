const db = require('../../core/db');

const getAllDrivers = async () => {
  return await db('driver').select('*');
};

const getDriverById = async (driverID) => {
  return await db('driver').where({ driverID }).first();
};

const createDriver = async (driverData) => {
  return await db('driver').insert(driverData).returning('*');
};

const updateDriver = async (driverID, driverData) => {
  return await db('driver').where({ driverID }).update(driverData).returning('*');
};

const deleteDriver = async (driverID) => {
  return await db('driver').where({ driverID }).del();
};

module.exports = {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
};
