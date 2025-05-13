import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome To Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
