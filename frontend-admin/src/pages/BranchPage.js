import React, { useState, useEffect } from 'react';
import { BACK_END_URL } from '../utils/const';

const BranchPage = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`${BACK_END_URL}/api/branch/`);
        if (!response.ok) throw new Error('Failed to fetch branch data');
        const data = await response.json();
        setBranches(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('❌ Error fetching branches:', error);
        setBranches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
  };

  const closeModal = () => {
    setSelectedBranch(null);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
      <h3 className="fw-semibold mb-4">Branch List</h3>

      {loading && <p>Loading branches...</p>}
      {!loading && branches.length === 0 && <p>No branch found.</p>}

      {!loading && branches.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Branch ID</th>
              <th>Road Name</th>
              <th>City</th>
              <th>Province</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="btn btn-link p-0 text-decoration-none text-primary"
                    onClick={() => handleBranchClick(branch)}
                  >
                    {branch.branchID}
                  </button>
                </td>
                <td>{branch.road_name}</td>
                <td>{branch.city}</td>
                <td>{branch.province}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Detail */}
      {selectedBranch && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
        >
          <div className="bg-light rounded shadow p-4" style={{ width: '360px', position: 'relative' }}>
            <button
              className="position-absolute top-0 end-0 btn btn-sm btn-link text-dark"
              onClick={closeModal}
            >
              ✖
            </button>
            <div className="text-center mb-3">
              <div className="text-primary fw-semibold">Branch ID : {selectedBranch.branchID}</div>
            </div>
            <div className="ms-2">
              <p><strong>Road Name</strong> : {selectedBranch.road_name}</p>
              <p><strong>City</strong> : {selectedBranch.city}</p>
              <p><strong>Province</strong> : {selectedBranch.province}</p>
              <p><strong>Phone Number</strong> : {selectedBranch.phone_number}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchPage;
