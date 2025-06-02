const db = require('../../core/db');

const getAllBranches = async () => {
  return await db('branch').select('*');
};

const getBranch = async (limit, offset) => {
  const data = await db('branch')
    .select('*')
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db('branch')
    .count('branchID as count'); 

  return {
    data,
    total: parseInt(count),
  };
};

const createBranch = async (branchData) => {
  return await db('branch').insert(branchData).returning('*');
};

const updateBranch = async (branchID, branchData) => {
  return await db('branch').where({ branchID }).update(branchData).returning('*');
};

const deleteBranch = async (branchID) => {
  return await db('branch').where({ branchID }).del();
};

module.exports = {
  getAllBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch
};
