const db = require('../../core/db');

const getAllBranches = async () => {
  return await db('branch').select('*');
};

const getBranchById = async (branchID) => {
  return await db('branch').where({ branchID }).first();
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
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch
};
