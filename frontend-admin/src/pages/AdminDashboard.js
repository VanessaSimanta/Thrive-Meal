// Import dan deklarasi tetap seperti sebelumnya
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../App.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedDriver, setSelectedDriver] = useState(null);

  const branches = [
    { id: '001', name: 'Cimahi Branch', road: 'Jalan Raya Pantura', city: 'Bandung', province: 'Jawa Barat', phone: '08128749947' },
    { id: '002', name: 'Depok Branch', road: 'Jalan Raya Bogor', city: 'Depok', province: 'Jawa Barat', phone: '08225640073' },
    { id: '003', name: 'Bekasi Branch', road: 'Transogi', city: 'Bekasi', province: 'Jawa Barat', phone: '08745732983' },
    { id: '004', name: 'Selatan Branch', road: 'Senopati 2', city: 'Jaksel', province: 'DKI Jakarta', phone: '08261298735' },
  ];

  const drivers = [
    { id: '011', name: 'Adi Saputra', phone: '081807657800', dob: '20 Juli 2003', road: 'Jalan Pantura', village: 'Sukamaju', district: 'Cimahi', branchId: '001' },
    { id: '026', name: 'Budi Santoso', phone: '08225640073', dob: '18 Mei 1999', road: 'Jalan Merdeka', village: 'Sukapura', district: 'Depok', branchId: '002' },
    { id: '066', name: 'Rina Karlika', phone: '08745732983', dob: '12 Januari 2000', road: 'Jalan Mangga', village: 'Harapan Baru', district: 'Bekasi', branchId: '003' },
    { id: '032', name: 'Ahmad Fadl', phone: '08261298735', dob: '5 Maret 1998', road: 'Jalan Melati', village: 'Cipete', district: 'Jakarta Selatan', branchId: '004' },
  ];

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleNavigate = (path) => {
    if (path === '/logout') {
      navigate(path);
    } else if (path === '/branch-driver') {
      setActiveView('branch-driver');
    } else {
      setActiveView('dashboard');
      navigate(path);
    }
  };

  const handleDriverClick = (driver) => {
    setSelectedDriver(driver);
  };

  const closeDriverModal = () => {
    setSelectedDriver(null);
  };

  const handleFetchMyData = () => {
    alert('Data successfully fetched!');
    // Tambahkan logic API fetch kamu di sini jika sudah ada
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className={`position-fixed top-0 start-0 h-100 shadow transition-sidebar ${showSidebar ? 'd-block' : 'd-none'}`}
             style={{ width: '260px', backgroundColor: '#e9f0dc', zIndex: 1050, padding: '2rem 1.5rem' }}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <strong className="fs-5">Admin Panel</strong>
              <button className="btn btn-sm text-danger fw-bold" onClick={() => setShowSidebar(false)}>✖</button>
            </div>
            <hr className="mt-3 mb-4" />
          </div>
          <ul className="list-unstyled ps-0">
            {[{ icon: '🧾', label: 'VIEW ORDER', path: '/view-orders' },
              { icon: '🛵', label: 'BRANCH & DRIVER', path: '/branch-driver' },
              { icon: '🧑‍🍳', label: 'EDIT MENU', path: '/edit-menu' },
              { icon: '🔒', label: 'Change Password', path: '/change-password' },
            ].map((item, idx) => (
              <li key={idx} className="mb-3">
                <button
                  className="btn w-100 text-start d-flex align-items-center px-2 py-2 border-0 rounded"
                  style={{ backgroundColor: 'transparent' }}
                  onClick={() => handleNavigate(item.path)}
                >
                  <span className="me-2 fs-5">{item.icon}</span>
                  <span className="fw-semibold">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="position-absolute bottom-0 start-0 w-100 p-3">
            <button
              className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleNavigate('/logout')}
              style={{ backgroundColor: '#283618' }}
            >
              <span className="me-2">🚪</span> Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-grow-1 w-100">
          <div className="d-flex align-items-center justify-content-between px-4 py-3 shadow-sm" style={{ backgroundColor: '#283618', color: 'white' }}>
            <button className="btn text-white fs-3" onClick={() => setShowSidebar(true)}>&#9776;</button>
            <h5 className="mb-0">MY DASHBOARD</h5>
            <img src={logo} alt="logo" style={{ height: '60px' }} />
          </div>

          <div className="p-4">
            {activeView === 'dashboard' && (
              <>
                <h1 className="fw-semibold mb-4">Welcome To Admin Dashboard</h1>
                <p className="text-muted">Manage orders, menus, branches, and more from this panel.</p>
              </>
            )}

            {activeView === 'branch-driver' && (
              <div>
                <h3 className="fw-semibold mb-4">Branch & Driver</h3>

                {/* Fetch My Data Button */}
                <div className="mb-3">
                  <button
                    className="btn btn-success px-4 py-2 rounded-3"
                    onClick={handleFetchMyData}
                  >
                    Fetch My Data
                  </button>
                </div>

                <h5>Branch List</h5>
                <table className="table table-bordered table-striped mb-4">
                  <thead className="table-light">
                    <tr>
                      <th>Branch Id</th>
                      <th>Branch Name</th>
                      <th>Road Name</th>
                      <th>City</th>
                      <th>Province</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.map((branch, index) => (
                      <tr key={index}>
                        <td>{branch.id}</td>
                        <td>{branch.name}</td>
                        <td>{branch.road}</td>
                        <td>{branch.city}</td>
                        <td>{branch.province}</td>
                        <td>{branch.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h5>Driver List</h5>
                <table className="table table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Driver Id</th>
                      <th>Driver Name</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map((driver, index) => (
                      <tr key={index}>
                        <td>
                          <button className="btn btn-link p-0 text-decoration-none text-primary" onClick={() => handleDriverClick(driver)}>
                            {driver.id}
                          </button>
                        </td>
                        <td>{driver.name}</td>
                        <td>{driver.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <a href="#" className="text-primary mt-3 d-block">Download as Excel</a>
              </div>
            )}

            {/* Driver Detail Popup */}
            {selectedDriver && (
              <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}>
                <div className="bg-light rounded shadow p-4" style={{ width: '360px', position: 'relative' }}>
                  <button className="position-absolute top-0 end-0 btn btn-sm btn-link text-dark" onClick={closeDriverModal}>✖</button>
                  <div className="text-center mb-3">
                    <img src="https://via.placeholder.com/80" alt="Driver Avatar" className="rounded-circle mb-2" />
                    <div className="text-danger fw-semibold">Driver ID : {selectedDriver.id}</div>
                    <div className="text-danger fw-semibold">Branch ID : {selectedDriver.branchId}</div>
                  </div>
                  <div className="ms-2">
                    <p><strong>Name</strong> : {selectedDriver.name}</p>
                    <p><strong>Date of Birth</strong> : {selectedDriver.dob}</p>
                    <p><strong>Phone Number</strong> : {selectedDriver.phone}</p>
                    <p><strong>Road Name</strong> : {selectedDriver.road}</p>
                    <p><strong>Urban Village</strong> : {selectedDriver.village}</p>
                    <p><strong>District</strong> : {selectedDriver.district}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer style={{ backgroundColor: '#283618', color: 'white', textAlign: 'center', padding: '1rem 0' }}>
            © 2025 Thrive Meal. All Rights Reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
