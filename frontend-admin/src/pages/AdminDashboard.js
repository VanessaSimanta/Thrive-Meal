import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../App.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const branches = [
    { id: '1', name: 'Cimahi Branch', road: 'Jalan Raya Pantura', city: 'Bandung', province: 'Jawa Barat', phone: '08128749947' },
    { id: '2', name: 'Depok Branch', road: 'Jalan Raya Bogor', city: 'Depok', province: 'Jawa Barat', phone: '08225640073' },
    { id: '3', name: 'Bekasi Branch', road: 'Transogi', city: 'Bekasi', province: 'Jawa Barat', phone: '08745732983' },
    { id: '4', name: 'Selatan Branch', road: 'Senopati 2', city: 'Jaksel', province: 'DKI Jakarta', phone: '08261298735' },
  ];

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleNavigate = (path) => {
    if (path === '/logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      navigate('/');
    } else if (path === '/branch') {
      setActiveView('branch');
    } else {
      setActiveView('dashboard');
      navigate(path);
    }
  };

  const handleFetchMyData = () => {
    alert('Data successfully fetched!');
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
              { icon: '🏢', label: 'BRANCH & DRIVER', path: '/branch' }, 
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

            {activeView === 'branch' && (
              <div>
                <h3 className="fw-semibold mb-4">Branch</h3>

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
              </div>
            )}
          </div>

          <footer style={{ backgroundColor: '#283618', color: 'white', textAlign: 'center', padding: '1rem 0' }}>
            © 2025 Thrive Meal. All Rights Reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
