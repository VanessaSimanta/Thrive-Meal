const express = require('express');
const router = express.Router();
const { getBranches, getBranchCtrl, createNewBranch, updateBranchInfo, deleteBranchInfo } = require('./controller');

router.get('/', getBranches);
router.get('/pagination', getBranchCtrl);
router.post('/', createNewBranch);
router.put('/:branchID', updateBranchInfo);
router.delete('/:branchID', deleteBranchInfo);

module.exports = router;