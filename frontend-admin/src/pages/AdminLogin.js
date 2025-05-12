import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');


    const handleLogin = async (e) => {
      e.preventDefault();
      
      setEmailError('');
      setPasswordError('');
      setLoginError('');

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = true;

      if (!emailPattern.test(email)) {
        setEmailError('Please enter a valid email address');
        isValid = false;
      }

      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        isValid = false;
      }

      if (!isValid) return;

      try {
        const response = await axios.post('http://localhost:8000/api/admin/login', {
          email,
          password,
        });

        // Jika berhasil login
        localStorage.setItem('isAdmin', 'true');
        window.location.href = '/dashboard';
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setLoginError(err.response.data.message);
        } else {
          setLoginError('Something went wrong. Please try again.');
        }
      }
    };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-white">
      <div className="d-flex shadow rounded overflow-hidden" style={{ width: '600px', height: '500px' }}>
        <div className="d-flex flex-column justify-content-center align-items-center px-4" style={{ backgroundColor: '#283618', width: '40%', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
          <img src="/thrivemeal.png" alt="Thrive Meal Logo" style={{ width: '250px', marginBottom: '10px' }} />
        </div>

        <div className="p-5 w-100" style={{ backgroundColor: '#E7F1DB' }}>
          <h3 className="mb-4 text-dark fw-bold" style={{ marginTop: '60px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', fontSize: '2rem'}}>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-2">
             <input
              type="text" 
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <small className="text-danger">{emailError}</small>}
            </div>
            <div className="mb-2 position-relative">
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
              {passwordError && <small className="text-danger d-block mt-1">{passwordError}</small>}
            </div>

            {loginError && <div className="text-danger text-center mt-2">{loginError}</div>}

            <button
              type="submit"
              className="btn w-50 text-white"
              style={{
                backgroundColor: '#283618',
                marginTop: '30px',
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto'
              }}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
