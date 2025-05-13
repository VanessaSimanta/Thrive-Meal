const db = require('../../core/db');
const bcrypt = require('bcrypt');

const getAdminByEmail = async (email) => {
  return await db('admin').where({ email }).first();
};

const updatePassword = async (email, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db('admin').where({ email }).update({ password: hashedPassword });
};

module.exports = {
  getAdminByEmail,
  updatePassword
};
