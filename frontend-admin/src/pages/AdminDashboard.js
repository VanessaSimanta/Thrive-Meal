import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../App.css';
import EditMenu from './EditMenu';
import ViewOrders from './ViewOrders';
import DriverPage from './DriverPage';
import BranchPage from './BranchPage';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [branchDriverView, setBranchDriverView] = useState('branch');

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") navigate("/");
  }, [navigate]);

  const handleNavigate = (path) => {
    if (path === "/logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      navigate("/");
    } else {
      const viewMap = {
        "/branch-driver": "branch-driver",
        "/edit-menu": "edit-menu",
        "/view-orders": "view-orders",
        "/change-password": "change-password",
        "/": "dashboard",
      };
      setActiveView(viewMap[path] || "dashboard");
    }
  };

  const closeDriverModal = () => {
    setSelectedDriver(null);
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className={`position-fixed top-0 start-0 h-100 shadow`}
          style={{
            width: "260px",
            backgroundColor: "#e9f0dc",
            zIndex: 1050,
            padding: "2rem 1.5rem",
            transition: "transform 0.4s ease-in-out",
            transform: showSidebar ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <strong className="fs-5">Admin Panel</strong>
              <button
                className="btn btn-sm text-danger fw-bold"
                onClick={() => setShowSidebar(false)}
              >
                ✖
              </button>
            </div>
            <hr className="mt-3 mb-4" />
          </div>
          <ul className="list-unstyled ps-0">
            {[
              { icon: "🧾", label: "VIEW ORDER", path: "/view-orders" },
              { icon: "🛵", label: "BRANCH & DRIVER", path: "/branch-driver" },
              { icon: "🧑‍🍳", label: "EDIT MENU", path: "/edit-menu" },
              {
                icon: "🔒",
                label: "Change Password",
                path: "/change-password",
              },
            ].map((item, idx) => (
              <li key={idx} className="mb-3">
                <button
                  className="btn w-100 text-start d-flex align-items-center px-2 py-2 border-0 rounded"
                  style={{ backgroundColor: "transparent" }}
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
              style={{ backgroundColor: "#283618" }}
              onClick={() => handleNavigate("/logout")}
            >
              <span className="me-2">🚪</span> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 w-100 d-flex flex-column">
          <div
            className="d-flex align-items-center justify-content-between px-4 py-3 shadow-sm"
            style={{ backgroundColor: "#283618", color: "white" }}
          >
            <button
              className="btn text-white fs-3"
              onClick={() => setShowSidebar(true)}
            >
              &#9776;
            </button>
            <h5
              className="mb-0 fw-bold"
              style={{ fontSize: "2.5rem", letterSpacing: "2px" }}
            >
              MY DASHBOARD
            </h5>
            <img src={logo} alt="logo" style={{ height: "75px" }} />
          </div>

          <div className="p-4">
            {activeView === "dashboard" && (
              <>
                <div className="container mt-5">
                  <div className="text-center mb-5">
                    <h1 className="fw-bold display-5 text-dark">Welcome to Admin Dashboard</h1>
                    <p className="text-muted fs-5">
                      Manage orders, menus, branches, and more from this panel.
                    </p>
                  </div>

                  <div className="row g-4 justify-content-center">
                    <div className="col-md-6 col-lg-4">
                      <div className="card shadow-lg h-100 border-0 rounded-4">
                        <div className="card-body text-center py-4">
                          <i className="bi bi-cart-check-fill fs-1 text-primary mb-3"></i>
                          <h5 className="card-title fs-4">Orders</h5>
                          <p className="text-muted">View and manage customer orders.</p>
                          <button
                            onClick={() => handleNavigate("/view-orders")}
                            className="btn custom-button px-4 rounded-pill"
                          >
                            Go to Orders
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                      <div className="card shadow-lg h-100 border-0 rounded-4">
                        <div className="card-body text-center py-4">
                          <i className="bi bi-book-fill fs-1 text-success mb-3"></i>
                          <h5 className="card-title fs-4">Menus</h5>
                          <p className="text-muted">Update food menus and pricing.</p>
                          <button
                            onClick={() => handleNavigate("/edit-menu")}
                            className="btn custom-button px-4 rounded-pill"
                          >
                            Go to Menus
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                      <div className="card shadow-lg h-100 border-0 rounded-4">
                        <div className="card-body text-center py-4">
                          <i className="bi bi-building fs-1 text-warning mb-3"></i>
                          <h5 className="card-title fs-4">Branches</h5>
                          <p className="text-muted">
                            Manage all branch locations and delivery drivers.
                          </p>
                          <button
                            onClick={() => handleNavigate("/branch-driver")}
                            className="btn custom-button px-4 rounded-pill"
                          >
                            Go to Branch & Driver
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-5">
                    <hr className="w-50 mx-auto" />
                    <p className="text-muted fs-4">
                      ⚠️ Jangan lupa logout setelah menggunakan dashboard ini untuk menjaga keamanan data.
                    </p>
                  </div>
                </div>
              </>

            )}

            {activeView === 'branch-driver' && (
              <div>
                <div className="mb-4 d-flex gap-3">
                  <button
                    className={`btn ${branchDriverView === 'branch' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setBranchDriverView('branch')}
                  >
                    Branches
                  </button>
                  <button
                    className={`btn ${branchDriverView === 'driver' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setBranchDriverView('driver')}
                  >
                    Drivers
                  </button>
                </div>
                {branchDriverView === 'branch' && <BranchPage />}
                {branchDriverView === 'driver' && <DriverPage />}
              </div>
            )}
            {activeView === "edit-menu" && <EditMenu />}
            {activeView === "view-orders" && <ViewOrders />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;