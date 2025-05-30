import React, { useState, useEffect } from 'react';
import { BACK_END_URL } from '../utils/const';
import { Button, Form, Card, Col, Row, Alert } from 'react-bootstrap';
import branchImg from '../images/branch.jpg';

const DriverPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [driverForm, setDriverForm] = useState({
    driverID: '',
    branchID: '',
    driver_name: '',
    driver_dob: '',
    phone_number: '',
    road_name: '',
    urban_village: '',
    district: '',
  });

  const fetchDrivers = async () => {
    try {
      const res = await fetch(`${BACK_END_URL}/api/driver/`);
      if (!res.ok) throw new Error('Failed to fetch drivers');
      const data = await res.json();
      setDrivers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('❌ Error:', err);
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverForm({ ...driverForm, [name]: value });
  };

  const resetForm = () => {
    setDriverForm({
      driverID: '',
      branchID: '',
      driver_name: '',
      driver_dob: '',
      phone_number: '',
      road_name: '',
      urban_village: '',
      district: '',
    });
    setIsEditMode(false);
    setShowForm(false);
  };

  const handleAddDriver = async () => {
    const empty = Object.values(driverForm).some((val) => val === '');
    if (empty) return showAlert('danger', 'Please fill in all fields.');

    try {
      const res = await fetch(`${BACK_END_URL}/api/driver/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driverForm),
      });
      if (!res.ok) throw new Error('Failed to add driver');
      await res.json();
      showAlert('success', '✅ Driver successfully added.');
      resetForm();
      fetchDrivers(); // ✅ Refresh list dari server
    } catch (err) {
      console.error('❌ Add driver error:', err);
      showAlert('danger', '❌ Failed to add driver.');
    }
  };

  const handleEditDriver = (driver) => {
    setDriverForm(driver);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleUpdateDriver = async () => {
    try {
      const res = await fetch(`${BACK_END_URL}/api/driver/${driverForm.driverID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driverForm),
      });
      if (!res.ok) throw new Error('Failed to update driver');
      const updated = await res.json();
      setDrivers(drivers.map((d) => (d.driverID === updated.driverID ? updated : d)));
      showAlert('success', '✏️ Driver updated successfully.');
      resetForm();
    } catch (err) {
      console.error('❌ Update error:', err);
      showAlert('danger', '❌ Failed to update driver.');
    }
  };

  const handleDeleteDriver = async (id) => {
    try {
      const res = await fetch(`${BACK_END_URL}/api/driver/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete driver');
      setDrivers(drivers.filter((d) => d.driverID !== id));
      showAlert('success', '🗑️ Driver deleted.');
    } catch (err) {
      console.error('❌ Delete error:', err);
      showAlert('danger', '❌ Failed to delete driver.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
      <h3 className="fw-semibold mb-4">Driver List</h3>

      {alert.show && (
        <Alert variant={alert.type} className="text-center fw-semibold">
          {alert.message}
        </Alert>
      )}

      {loading && <p>Loading drivers...</p>}
      {!loading && drivers.length === 0 && <p>No driver found.</p>}

      {!loading && drivers.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th style={{ textAlign: 'center' }}>Driver ID</th>
              <th style={{ textAlign: 'center' }}>Driver Name</th>
              <th style={{ textAlign: 'center' }}>Road Name</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d, idx) => (
              <tr key={idx}>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-link p-0 text-decoration-none text-primary"
                    onClick={() => setSelectedDriver(d)}
                  >
                    {d.driverID}
                  </button>
                </td>
                <td style={{ textAlign: 'center' }}>{d.driver_name}</td>
                <td style={{ textAlign: 'center' }}>{d.road_name}</td>
                <td style={{ textAlign: 'center' }}>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button
                      variant="warning"
                      size="sm"
                      className="text-white"
                      onClick={() => handleEditDriver(d)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteDriver(d.driverID)}
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
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Hide Form' : 'Add New Driver'}
        </Button>
      </div>

      {showForm && (
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg border-0 mb-5">
              <Card.Body>
                <h5 className="fw-bold text-success mb-3 text-center">
                  {isEditMode ? 'Edit Driver' : 'Add New Driver'}
                </h5>
                <Form>
                  {[
                    ['driverID', 'Driver ID', 'text'],
                    ['branchID', 'Branch ID', 'text'],
                    ['driver_name', 'Driver Name', 'text'],
                    ['driver_dob', 'Date of Birth', 'date'],
                    ['phone_number', 'Phone Number', 'text'],
                    ['road_name', 'Road Name', 'text'],
                    ['urban_village', 'Urban Village', 'text'],
                    ['district', 'District', 'text'],
                  ].map(([name, label, type]) => (
                    <Form.Group className="mb-3" key={name}>
                      <Form.Label>{label}</Form.Label>
                      <Form.Control
                        type={type}
                        name={name}
                        value={driverForm[name]}
                        onChange={handleInputChange}
                        disabled={isEditMode && name === 'driverID'}
                        placeholder={name === 'driver_dob' ? 'YYYY-MM-DD' : ''}
                      />
                    </Form.Group>
                  ))}

                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Button
                      style={{ backgroundColor: '#CADCB5', border: 'none', color: 'black' }}
                      className="px-4 fw-semibold"
                      onClick={isEditMode ? handleUpdateDriver : handleAddDriver}
                    >
                      {isEditMode ? 'Update Driver' : 'Add Driver'}
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

      {selectedDriver && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
        >
          <div className="bg-light rounded shadow p-4" style={{ width: '360px', position: 'relative' }}>
            <button
              className="position-absolute top-0 end-0 btn btn-sm btn-link text-dark"
              onClick={() => setSelectedDriver(null)}
            >
              ✖
            </button>
            <div className="text-center mb-3">
              <img src={branchImg} alt="Branch" className="rounded-circle mb-2" style={{ width: '80px', height: '80px' }} />
              <div className="text-danger fw-semibold">Driver ID : {selectedDriver.driverID}</div>
              <div className="text-danger fw-semibold">Branch ID : {selectedDriver.branchID}</div>
            </div>
            <div className="ms-2">
              <p><strong>Name</strong> : {selectedDriver.driver_name}</p>
              <p><strong>Date of Birth</strong> : {selectedDriver.driver_dob}</p>
              <p><strong>Phone Number</strong> : {selectedDriver.phone_number}</p>
              <p><strong>Road Name</strong> : {selectedDriver.road_name}</p>
              <p><strong>Urban Village</strong> : {selectedDriver.urban_village}</p>
              <p><strong>District</strong> : {selectedDriver.district}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverPage;
