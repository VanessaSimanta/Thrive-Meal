const db = require('../../core/db');

const getAdminByEmail = async (email) => {
  return db('admin').where({ email }).first();
};

module.exports = {
  getAdminByEmail,
};
