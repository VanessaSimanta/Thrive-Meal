const { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch } = require('./repository');

const getBranches = async (req, res) => {
  try {
    const branches = await getAllBranches();
    return res.status(200).json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBranch = async (req, res) => {
  const { branchID } = req.params;
  try {
    const branch = await getBranchById(branchID);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    return res.status(200).json(branch);
  } catch (error) {
    console.error('Error fetching branch:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createNewBranch = async (req, res) => {
  const branchData = req.body;
  try {
    const newBranch = await createBranch(branchData);
    return res.status(201).json(newBranch);
  } catch (error) {
    console.error('Error creating branch:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBranchInfo = async (req, res) => {
  const { branchID } = req.params;
  const branchData = req.body;
  try {
    const updatedBranch = await updateBranch(branchID, branchData);
    if (!updatedBranch.length) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    return res.status(200).json(updatedBranch);
  } catch (error) {
    console.error('Error updating branch:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBranchInfo = async (req, res) => {
  const { branchID } = req.params;
  try {
    const rowsDeleted = await deleteBranch(branchID);
    if (rowsDeleted === 0) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    return res.status(200).json({ message: 'Branch deleted successfully' });
  } catch (error) {
    console.error('Error deleting branch:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getBranches,
  getBranch,
  createNewBranch,
  updateBranchInfo,
  deleteBranchInfo
};
