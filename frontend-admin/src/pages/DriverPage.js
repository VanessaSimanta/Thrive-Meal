import React, { useState, useEffect } from 'react';
import { BACK_END_URL }  from '../utils/const';

const DriverPage = () => {
  const [driver, setDriver] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await fetch(`${BACK_END_URL}/api/driver/`);
        if (!response.ok) throw new Error('Failed to fetch driver');
        const data = await response.json();
        setDriver(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('❌ Error fetching driver:', error);
        setDriver([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, []);

  const handleDriverClick = (driver) => {
    setSelectedDriver(driver);
  };

  const closeDriverModal = () => {
    setSelectedDriver(null);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
      <h3 className="fw-semibold mb-4">Driver List</h3>

      {loading && <p>Loading driver...</p>}
      {!loading && driver.length === 0 && <p>No driver found.</p>}

      {!loading && driver.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Driver Id</th>
              <th>Driver Name</th>
              <th>Address (Road Noame)</th>
            </tr>
          </thead>
          <tbody>
            {driver.map((driver, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="btn btn-link p-0 text-decoration-none text-primary"
                    onClick={() => handleDriverClick(driver)}
                  >
                    {driver.driverID}
                  </button>
                </td>
                <td>{driver.driver_name}</td>
                <td>{driver.road_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Detail Driver */}
      {selectedDriver && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
        >
          <div className="bg-light rounded shadow p-4" style={{ width: '360px', position: 'relative' }}>
            <button
              className="position-absolute top-0 end-0 btn btn-sm btn-link text-dark"
              onClick={closeDriverModal}
            >
              ✖
            </button>
            <div className="text-center mb-3">
              <img src="https://via.placeholder.com/80" alt="Driver Avatar" className="rounded-circle mb-2" />
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
