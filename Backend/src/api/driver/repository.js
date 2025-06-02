const db = require('../../core/db');

const getAllDrivers = async () => {
  return await db('driver').select('*');
};

const getDriver = async (limit, offset) => {
 const data = await db('driver')
    .select('*')
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db('driver')
    .count('driverID as count'); 

  return {
    data,
    total: parseInt(count),
  };
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
  getDriver,
  createDriver,
  updateDriver,
  deleteDriver
};
