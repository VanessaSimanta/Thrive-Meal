import React, { useState, useEffect } from 'react';
import { BACK_END_URL } from '../utils/const';
import { Button, Form, Card, Col, Row, Alert } from 'react-bootstrap';
import branchImg from '../images/branch.jpg';
import { InputGroup } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';

const DriverPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [phoneError, setPhoneError] = useState('');
  const [driverForm, setDriverForm] = useState({
    branchID: '',
    driver_name: '',
    driver_dob: '',
    phone_number: '',
    road_name: '',
    urban_village: '',
    district: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchDrivers = async (page = 1) => {
    try {
      const res = await fetch(`${BACK_END_URL}/api/driver/pagination?page=${page}`);
      if (!res.ok) throw new Error('Failed to fetch drivers');
      const data = await res.json();

      if (data && data.data) {
        setDrivers(data.data);
        setCurrentPage(data.currentPage);
        setLastPage(data.lastPage);
      } else {
        setDrivers([]);
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await fetch(`${BACK_END_URL}/api/branch/`);
      if (!res.ok) throw new Error('Failed to fetch branches');
      const data = await res.json();
      setBranches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('❌ Fetch branches error:', err);
      setBranches([]);
    }
  };

  useEffect(() => {
    fetchDrivers(1);
    fetchBranches();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone_number') {
      const isNumeric = /^[0-9]*$/.test(value);
      setPhoneError(isNumeric ? '' : 'Phone number must contain only digits.');
    }

    setDriverForm({ ...driverForm, [name]: value });
  };

  const resetForm = () => {
    setDriverForm({
      branchID: '',
      driver_name: '',
      driver_dob: '',
      phone_number: '',
      road_name: '',
      urban_village: '',
      district: '',
    });
    setPhoneError('');
    setIsEditMode(false);
    setShowForm(false);
    setSelectedDriver(null);
  };

  const handleAddDriver = async () => {
    const empty = Object.values(driverForm).some((val) => val === '');
    if (empty) return showAlert('danger', 'Please fill in all fields.');
    if (phoneError) return showAlert('danger', 'Fix phone number input first.');

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
      fetchDrivers();
    } catch (err) {
      console.error('❌ Add driver error:', err);
      showAlert('danger', '❌ Failed to add driver.');
    }
  };

  const handleEditDriver = (driver) => {
    setDriverForm({ ...driver });
    setPhoneError('');
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleUpdateDriver = async () => {
    if (phoneError) return showAlert('danger', 'Fix phone number input first.');
    if (!driverForm.driverID) return showAlert('danger', 'Driver ID is missing.');

    try {
      const res = await fetch(`${BACK_END_URL}/api/driver/${driverForm.driverID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driverForm),
      });
      if (!res.ok) throw new Error('Failed to update driver');
      const updated = await res.json();
      showAlert('success', '✏️ Driver updated successfully.');
      resetForm();
      fetchDrivers();
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
      if (selectedDriver?.driverID === id) {
        setSelectedDriver(null);
      }
    } catch (err) {
      console.error('❌ Delete error:', err);
      showAlert('danger', '❌ Failed to delete driver.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
      <h3 className="fw-semibold mb-4">Driver List</h3>
      {/* Search Bar */}
      <div className="d-flex mb-4 px-3">
        <InputGroup className="w-100" style={{ maxWidth: '500px' }}>
          {/* Search Icon */}
          <InputGroup.Text style={{ backgroundColor: '#E7F1DB', border: '1px solid #ced4da' }}>
            <FaSearch color="#748E57" />
          </InputGroup.Text>

          {/* Input Field */}
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{
              borderLeft: 'none',
              padding: '10px 15px',
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
            }}
          />

          {/* Clear Button */}
          {searchKeyword && (
            <Button
              variant="outline-secondary"
              onClick={() => setSearchKeyword('')}
              style={{
                borderLeft: 'none',
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
                backgroundColor: '#ffffff',
                borderColor: '#ced4da',
              }}
            >
              <FaTimes color="#C1282E" />
            </Button>
          )}
        </InputGroup>
      </div>
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
              <th className="text-center">Driver ID</th>
              <th className="text-center">Driver Name</th>
              <th className="text-center">Road Name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">
                  No drivers found.
                </td>
              </tr>
            ) : (
              drivers
                .filter((d) =>
                  d.driver_name
                    ?.toLowerCase()
                    .includes(searchKeyword.toLowerCase().trim())
                )
                .map((d, idx) => (
                  <tr key={idx}>
                    <td className="text-center">
                      <button
                        className="btn btn-link p-0 text-decoration-none text-primary"
                        onClick={() => setSelectedDriver(d)}
                      >
                        {d.driverID}
                      </button>
                    </td>
                    <td className="text-center">{d.driver_name}</td>
                    <td className="text-center">{d.road_name}</td>
                    <td className="text-center">
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
                ))
            )}
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

      <div className="text-center my-4 space-x-4">
        <button
          className="fetch-button m-3"
          onClick={() => {
            const prevPage = currentPage - 1;
            if (prevPage >= 1) {
              fetchDrivers(prevPage);
              setCurrentPage(prevPage);
            }
          }}
          disabled={currentPage <= 1}
        >
          Previous Page
        </button>

        <button
          className="fetch-button m-3"
          onClick={() => {
            const nextPage = currentPage + 1;
            if (nextPage <= lastPage) {
              fetchDrivers(nextPage);
              setCurrentPage(nextPage);
            }
          }}
          disabled={currentPage >= lastPage}
        >
          Next Page
        </button>
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
                  <Form.Group className="mb-3">
                    <Form.Label>Branch</Form.Label>
                    <Form.Select name="branchID" value={driverForm.branchID} onChange={handleInputChange}>
                      <option value="" disabled hidden>Select Branch</option>
                      {branches.map((branch) => (
                        <option key={branch.branchID} value={branch.branchID}>
                          {branch.city}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {[
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
                        placeholder={name === 'driver_dob' ? 'YYYY-MM-DD' : ''}
                      />
                      {name === 'phone_number' && phoneError && (
                        <Form.Text className="text-danger fw-semibold">{phoneError}</Form.Text>
                      )}
                    </Form.Group>
                  ))}

                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Button
                      style={{ backgroundColor: '#CADCB5', border: 'none', color: 'black' }}
                      className="px-4 fw-semibold"
                      onClick={isEditMode ? handleUpdateDriver : handleAddDriver}
                      type="button"
                    >
                      {isEditMode ? 'Update Driver' : 'Add Driver'}
                    </Button>
                    <Button variant="secondary" className="px-4 fw-semibold" onClick={resetForm} type="button">
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
          onClick={() => setSelectedDriver(null)}
        >
          <div
            className="bg-light rounded shadow p-4"
            style={{ width: '360px', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="position-absolute top-0 end-0 btn btn-sm btn-link text-dark"
              onClick={() => setSelectedDriver(null)}
              aria-label="Close"
            >
              ✖
            </button>
            <div className="text-center mb-3">
              <img
                src={branchImg}
                alt="Branch"
                className="rounded-circle mb-2"
                style={{ width: '80px', height: '80px' }}
              />
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