import React, { useState, useEffect } from 'react';
import { BACK_END_URL } from '../utils/const';
import { Button, Form, Card, Col, Row, Alert } from 'react-bootstrap';

const BranchPage = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBranch, setNewBranch] = useState({
    branchID: '',
    road_name: '',
    city: '',
    province: '',
    phone_number: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Fungsi fetchBranches agar bisa dipanggil ulang
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

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
  };

  const closeModal = () => {
    setSelectedBranch(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBranch({ ...newBranch, [name]: value });
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  const handleAddBranch = async () => {
    const { branchID, road_name, city, province, phone_number } = newBranch;
    if (!branchID || !road_name || !city || !province || !phone_number) {
      showAlert('danger', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${BACK_END_URL}/api/branch/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBranch),
      });

      if (!response.ok) throw new Error('Failed to add branch');
      await response.json();
      showAlert('success', '✅ Branch successfully added.');
      resetForm();
      fetchBranches(); // Refresh data setelah tambah
    } catch (error) {
      console.error('❌ Error adding branch:', error);
      showAlert('danger', '❌ Failed to add branch.');
    }
  };

  const handleEditBranch = (branch) => {
    setNewBranch(branch);
    setIsEditMode(true);
    setShowAddForm(true);
  };

  const handleUpdateBranch = async () => {
    const { branchID, road_name, city, province, phone_number } = newBranch;
    if (!branchID || !road_name || !city || !province || !phone_number) {
      showAlert('danger', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${BACK_END_URL}/api/branch/${branchID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBranch),
      });

      if (!response.ok) throw new Error('Failed to update branch');
      await response.json();
      showAlert('success', '✏️ Branch successfully updated.');
      resetForm();
      fetchBranches(); // Refresh data setelah edit
    } catch (error) {
      console.error('❌ Error updating branch:', error);
      showAlert('danger', '❌ Failed to update branch.');
    }
  };

  const handleDeleteBranch = async (id) => {
    try {
      const response = await fetch(`${BACK_END_URL}/api/branch/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete branch');
      setBranches(branches.filter((b) => b.branchID !== id));
      showAlert('success', '🗑️ Branch successfully deleted.');
    } catch (error) {
      console.error('❌ Error deleting branch:', error);
      showAlert('danger', '❌ Failed to delete branch.');
    }
  };

  const resetForm = () => {
    setNewBranch({
      branchID: '',
      road_name: '',
      city: '',
      province: '',
      phone_number: '',
    });
    setIsEditMode(false);
    setShowAddForm(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
      <h3 className="fw-semibold mb-4">Branch List</h3>

      {alert.show && (
        <Alert variant={alert.type} className="fw-semibold text-center">
          {alert.message}
        </Alert>
      )}

      {loading && <p>Loading branches...</p>}
      {!loading && branches.length === 0 && <p>No branch found.</p>}

      {!loading && branches.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr style={{ textAlign: 'center' }}>
              <th>Branch ID</th>
              <th>Road Name</th>
              <th>City</th>
              <th>Province</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={index} style={{ textAlign: 'center' }}>
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
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button
                      variant="warning"
                      size="sm"
                      className="fw-semibold text-white"
                      onClick={() => handleEditBranch(branch)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="fw-semibold"
                      onClick={() => handleDeleteBranch(branch.branchID)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-center mb-4 mt-4">
        <Button
          style={{ backgroundColor: '#CADCB5', border: 'none', color: '#000' }}
          className="fw-semibold px-4 py-2"
          onClick={() => {
            resetForm();
            setShowAddForm(!showAddForm);
          }}
        >
          {showAddForm ? 'Hide Form' : 'Add New Branch'}
        </Button>
      </div>

      {showAddForm && (
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg border-0 mb-5">
              <Card.Body>
                <h5 className="fw-bold text-success mb-3 text-center">
                  {isEditMode ? 'Edit Branch' : 'Add New Branch'}
                </h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Branch ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="branchID"
                      value={newBranch.branchID}
                      onChange={handleInputChange}
                      disabled={isEditMode}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Road Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="road_name"
                      value={newBranch.road_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={newBranch.city}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      type="text"
                      name="province"
                      value={newBranch.province}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone_number"
                      value={newBranch.phone_number}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Button
                      style={{ backgroundColor: '#CADCB5', border: 'none', color: 'black' }}
                      className="px-4 fw-semibold"
                      onClick={isEditMode ? handleUpdateBranch : handleAddBranch}
                    >
                      {isEditMode ? 'Update Branch' : 'Add Branch'}
                    </Button>
                    <Button variant="secondary" className="px-4 fw-semibold" onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

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
