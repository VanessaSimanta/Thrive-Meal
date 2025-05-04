import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import ikon

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login', { email, password });
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-white">
      <div className="d-flex shadow rounded overflow-hidden" style={{ width: '600px', height: '500px' }}>
        <div className="d-flex flex-column justify-content-center align-items-center px-4" style={{ backgroundColor: '#283618', width: '40%', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
          <img src="/thrivemeal.png" alt="Thrive Meal Logo" style={{ width: '250px', marginBottom: '10px' }} />
        </div>

   
        <div className="p-5 w-100" style={{ backgroundColor: '#E7F1DB' }}>
          <h3 className="mb-4 text-dark fw-bold" style={{ marginTop: '60px' }} >Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-outline-secondary position-absolute top-0 end-0 mt-0 me-0"
                style={{ height: '38px' }}
              >
                {showPassword ? <FaEyeSlash size={23} /> : <FaEye size={23} />}
              </button>
            </div>
            <button type="submit" className="btn w-50 text-white" style={{ backgroundColor: '#283618', marginTop: '40px',display: 'block', marginRight: 'auto', marginLeft: 'auto'  }}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
