import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../App.css';
import EditMenu from './EditMenu';
import ViewOrders from './ViewOrders';
import DriverPage from './DriverPage';
import BranchPage from './BranchPage';
import ChangePassword from './ChangePassword';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [branchDriverView, setBranchDriverView] = useState('branch');
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [weeklyOrders, setWeeklyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") navigate("/");

    const loadData = async () => {
      await fetchMonthlyOrders();
      await fetchWeeklyOrders();
      setLoading(false);
    };

    loadData();
  }, [navigate]);

  const fetchMonthlyOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/orders/orders");
      const data = await response.json();

      const monthlyCount = Array(12).fill(0);
      console.log("Data received:", data);

      data.forEach(order => {
        const date = new Date(order.createdAt);
        const month = date.getMonth();
        monthlyCount[month]++;
      });

      setMonthlyOrders(monthlyCount.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch monthly orders:", error);
    }
  };

  const fetchWeeklyOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/orders/orders");
      const data = await response.json();

      const thisWeek = Array(7).fill(0);
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());

      data.forEach(order => {
        const orderDate = new Date(order.createdAt);
        if (orderDate >= startOfWeek) {
          const dayIndex = orderDate.getDay();
          thisWeek[dayIndex]++;
        }
      });

      const result = [{
        Sun: thisWeek[0],
        Mon: thisWeek[1],
        Tue: thisWeek[2],
        Wed: thisWeek[3],
        Thu: thisWeek[4],
        Fri: thisWeek[5],
        Sat: thisWeek[6],
      }];

      setWeeklyOrders(result);
    } catch (error) {
      console.error("Failed to fetch weekly orders:", error);
    }
  };

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

  const lineData1 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Order Masuk',
        data: monthlyOrders,
        borderColor: '#f39c12',
        backgroundColor: 'rgba(243, 156, 18, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const lineData2 = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: weeklyOrders.map((week, index) => ({
      label: `Minggu ${index + 1}`,
      data: Object.values(week),
      borderColor: ['#f39c12', '#27ae60', '#3498db'][index % 3],
      backgroundColor: 'transparent',
      tension: 0.4,
      fill: false
    }))
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 20 }
      }
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="d-flex flex-grow-1">
        <div className="position-fixed top-0 start-0 h-100 shadow"
          style={{
            width: "260px",
            backgroundColor: "#e9f0dc",
            zIndex: 1050,
            padding: "2rem 1.5rem",
            transform: showSidebar ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.4s ease-in-out"
          }}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <strong className="fs-5">Admin Panel</strong>
              <button className="btn btn-sm text-danger fw-bold" onClick={() => setShowSidebar(false)}>✖</button>
            </div>
            <hr className="mt-3 mb-4" />
          </div>
          <ul className="list-unstyled ps-0">
            {[{ icon: "🧾", label: "VIEW ORDER", path: "/view-orders" },
            { icon: "🛵", label: "BRANCH & DRIVER", path: "/branch-driver" },
            { icon: "🧑‍🍳", label: "EDIT MENU", path: "/edit-menu" },
            { icon: "🔒", label: "Change Password", path: "/change-password" }].map((item, idx) => (
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

        <div className="flex-grow-1 w-100 d-flex flex-column">
          <div
            className="d-flex align-items-center justify-content-between px-4 py-3 shadow-sm"
            style={{ backgroundColor: "#283618", color: "white" }}
          >
            <button className="btn text-white fs-3" onClick={() => setShowSidebar(true)}>&#9776;</button>
            <h5 className="mb-0 fw-bold" style={{ fontSize: "2.5rem", letterSpacing: "2px" }}>MY DASHBOARD</h5>
            <img src={logo} alt="logo" style={{ height: "75px" }} />
          </div>

          <div className="p-4">
            {activeView === "dashboard" && (
              <>
                <div className="container mt-5">
                  <div className="text-center mb-4">
                    <h1 className="fw-bold display-5 text-dark">Welcome to Admin Dashboard</h1>
                    <p className="text-muted fs-5">Monitor activity with real-time statistics</p>
                  </div>

                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="row g-4 mb-5">
                      <div className="col-md-6">
                        <div className="p-3 bg-white shadow rounded-4 h-100">
                          <h5 className="text-center mb-3 fw-bold">Order Bulanan</h5>
                          <Line data={lineData1} options={lineOptions} height={200} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 bg-white shadow rounded-4 h-100">
                          <h5 className="text-center mb-3 fw-bold">Order Mingguan</h5>
                          <Line data={lineData2} options={lineOptions} height={200} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row g-4 justify-content-center">
                    <div className="col-md-4">
                      <div className="bg-white shadow rounded-4 p-4 text-center h-100">
                        <h4 className="fw-bold mb-2">Orders</h4>
                        <p className="text-muted">Lihat dan kelola semua pesanan pelanggan.</p>
                        <button
                          className="btn btn-success rounded-pill px-4 py-2 fw-semibold"
                          onClick={() => setActiveView("view-orders")}
                        >
                          Go to Orders
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="bg-white shadow rounded-4 p-4 text-center h-100">
                        <h4 className="fw-bold mb-2">Menus</h4>
                        <p className="text-muted">Kelola dan edit semua menu makanan.</p>
                        <button
                          className="btn btn-success rounded-pill px-4 py-2 fw-semibold"
                          onClick={() => setActiveView("edit-menu")}
                        >
                          Go to Menu
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="bg-white shadow rounded-4 p-4 text-center h-100">
                        <h4 className="fw-bold mb-2">Branches</h4>
                        <p className="text-muted">Atur cabang dan driver aktif.</p>
                        <button
                          className="btn btn-success rounded-pill px-4 py-2 fw-semibold"
                          onClick={() => setActiveView("branch-driver")}
                        >
                          Go to Branches
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeView === 'branch-driver' && (
              <div>
                <div className="mb-4 d-flex gap-3">
                  <button className={`btn ${branchDriverView === 'branch' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setBranchDriverView('branch')}>Branches</button>
                  <button className={`btn ${branchDriverView === 'driver' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setBranchDriverView('driver')}>Drivers</button>
                </div>
                {branchDriverView === 'branch' && <BranchPage />}
                {branchDriverView === 'driver' && <DriverPage />}
              </div>
            )}

            {activeView === "edit-menu" && <EditMenu />}
            {activeView === "view-orders" && <ViewOrders />}
            {activeView === "change-password" && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
