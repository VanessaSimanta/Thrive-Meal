const express = require('express');
const router = express.Router();
const { getBranches, getBranch, createNewBranch, updateBranchInfo, deleteBranchInfo } = require('./controller');

router.get('/', getBranches);
router.get('/:branchID', getBranch);
router.post('/', createNewBranch);
router.put('/:branchID', updateBranchInfo);
router.delete('/:branchID', deleteBranchInfo);

module.exports = (app) => {
  app.use('/api/branch', router);
};